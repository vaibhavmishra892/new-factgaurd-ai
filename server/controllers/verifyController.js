
import Verification from '../models/Verification.js';

export const verifyClaim = async (req, res) => {
    try {
        console.log("Received verification request:", req.body);
        const { claim, image, userId } = req.body; // userId is optional

        if (!claim && !image) {
            console.warn("Claim and Image missing in request");
            return res.status(400).json({ error: 'Claim or Image is required' });
        }

        // Call Python AI Service
        // Call Python AI Service
        let pythonServiceUrl = process.env.PYTHON_SERVICE_URL || 'http://127.0.0.1:8000/verify';
        pythonServiceUrl = pythonServiceUrl.trim().replace(/\/+$/, ''); // specific fix for trailing slash

        // If the user forgot /verify, append it?
        // Actually, if they provided just domain, we should append it.
        // But usually we ask for full URL.
        // If they provided full URL .../verify, good.
        // If they provided .../verify/, we stripped slash.
        // If they provided .../ (root), we stripped slash -> ...
        // Let's rely on user instruction, but stripping slash is safe.

        try {
            console.log(`Calling AI service at ${pythonServiceUrl}`);
            const response = await fetch(pythonServiceUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ claim, image }),
            });

            console.log("AI Service response status:", response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error("AI Service Error:", errorData);
                throw new Error(errorData.detail || `AI Service error: ${response.statusText}`);
            }

            const data = await response.json();

            const aiReport = (data && data.result) ? String(data.result) : "No report generated.";

            // Robust parsing of the text report
            let status = "INCONCLUSIVE";
            let confidence = "N/A";

            // Extract Verdict
            const verdictMatch = aiReport.match(/Verdict:\s*([A-Z\s]+)/i);
            if (verdictMatch) {
                const rawVerdict = verdictMatch[1].toUpperCase().trim();

                // Check NEGATIVE verdicts first to catch "Verified False" etc.
                if (['CONTRADICTED', 'FALSE', 'FAKE', 'DEBUNKED', 'UNSUPPORTED', 'NOT FACTUAL', 'INCORRECT'].some(v => rawVerdict.includes(v))) {
                    status = 'CONTRADICTED';
                }
                // Then check POSITIVE verdicts
                else if (['VERIFIED', 'SUPPORTED', 'TRUE', 'PARTIALLY TRUE', 'FACTUAL', 'CORRECT'].some(v => rawVerdict.includes(v))) {
                    status = 'VERIFIED';
                }
            }

            // Extract Confidence
            const confidenceMatch = aiReport.match(/Confidence:\s*(.+)/i);
            if (confidenceMatch) {
                confidence = confidenceMatch[1].trim();
            }

            // Extract Sources
            const sourcesMatch = aiReport.split(/Sources:/i)[1];
            let structuredSources = [];

            if (sourcesMatch) {
                const lines = sourcesMatch.split('\n').filter(line => line.trim().length > 0);
                structuredSources = lines.map(line => {
                    // Try to parse standard format: "1. Source: Title (Date)"
                    // Regex: Number dot Space (Source): (Title) (Date)
                    const match = line.match(/^\d+\.\s*([^:]+):\s*"?([^"(]+)"?\s*(?:\(([^)]+)\))?/);

                    if (match) {
                        return {
                            source: match[1].trim(),
                            title: match[2].trim(),
                            date: match[3] ? match[3].trim() : "Recent",
                            url: null // URL extraction would require more advanced parsing or metadata from Python
                        };
                    }

                    // Fallback for less structured lines
                    const cleanLine = line.replace(/^\d+\.\s*/, '').trim();
                    if (cleanLine.length < 5) return null; // Skip garbage

                    return {
                        source: "External Source",
                        title: cleanLine,
                        date: "N/A",
                        url: null
                    };
                }).filter(Boolean); // Remove nulls
            }

            const result = {
                status,
                confidence,
                timestamp: new Date().toISOString(),
                sources: structuredSources,
                explanation: {
                    summary: "AI Verification Complete",
                    points: [aiReport]
                }
            };

            // Save to MongoDB
            try {
                await Verification.create({
                    user: userId || null, // Link to user if provided
                    claim: claim || "Image Verification",
                    status,
                    confidence,
                    explanation: result.explanation,
                    sources: result.sources
                });
                console.log("[DB] Verification saved to MongoDB");
            } catch (dbError) {
                console.error("[DB] Failed to save verification:", dbError);
                // Don't fail the request if DB save fails
            }

            res.json(result);

        } catch (fetchError) {
            console.error('Failed to connect to AI service:', fetchError);
            res.status(503).json({
                error: 'AI Service unavailable',
                details: fetchError.message
            });
        }

    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getHistory = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ error: "User ID required" });
        }

        const history = await Verification.find({ user: userId }).sort({ createdAt: -1 });

        // Map to frontend expectation
        const formattedHistory = history.map(item => ({
            text: item.claim,
            status: item.status,
            time: item.createdAt.toISOString()
        }));

        res.json(formattedHistory);
    } catch (error) {
        console.error("Get History Error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
