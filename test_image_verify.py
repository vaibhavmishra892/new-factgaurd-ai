
import requests
import base64
from PIL import Image, ImageDraw
import io

def create_test_image():
    # Create a white image with black text
    img = Image.new('RGB', (400, 100), color='white')
    d = ImageDraw.Draw(img)
    d.text((10, 40), "Gold prices surged yesterday", fill='black')
    
    # Save to buffer
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    return buf.getvalue()

def test_verify():
    print("Generating test image...")
    img_data = create_test_image()
    b64_img = base64.b64encode(img_data).decode('utf-8')
    data_url = f"data:image/png;base64,{b64_img}"
    
    payload = {
        "image": data_url
    }
    
    print("Sending request to http://127.0.0.1:8000/verify...")
    try:
        response = requests.post("http://127.0.0.1:8000/verify", json=payload)
        print(f"Status Code: {response.status_code}")
        print("Response Body:")
        print(response.text)
    except Exception as e:
        print(f"Request failed: {e}")

if __name__ == "__main__":
    test_verify()
