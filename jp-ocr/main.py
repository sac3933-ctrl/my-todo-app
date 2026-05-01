import re
import tkinter as tk
from tkinter import filedialog
import numpy as np
from PIL import Image
import easyocr
from deep_translator import GoogleTranslator

JAPANESE_PATTERN = re.compile(
    r'[\u3040-\u309F\u30A0-\u30FF\uFF66-\uFF9F\u4E00-\u9FFF\u3000-\u303F]+'
)

_reader = None
_translator = None


def get_reader():
    global _reader
    if _reader is None:
        print("OCR 모델 로딩 중... (최초 1회는 모델 다운로드 시간 필요)")
        _reader = easyocr.Reader(['ja'])
        print("로딩 완료")
    return _reader


def get_translator():
    global _translator
    if _translator is None:
        _translator = GoogleTranslator(source='ja', target='ko')
    return _translator


def extract_japanese(image_path):
    img = np.array(Image.open(image_path).convert('RGB'))
    results = get_reader().readtext(img, detail=0)
    full_text = '\n'.join(results)
    matches = JAPANESE_PATTERN.findall(full_text)
    translator = get_translator()
    lines = []
    for jp in matches:
        try:
            meaning = translator.translate(jp)
        except Exception as e:
            meaning = f"번역 실패: {e}"
        lines.append(f"{jp} ({meaning})")
    return '\n'.join(lines)


def on_select():
    path = filedialog.askopenfilename(
        title="이미지 선택",
        filetypes=[
            ("이미지 파일", "*.png *.jpg *.jpeg *.bmp *.webp"),
            ("모든 파일", "*.*"),
        ],
    )
    if not path:
        return
    print(f"\n=== {path} ===")
    text = extract_japanese(path)
    print(text if text else "(일본어를 찾지 못했습니다)")


def main():
    root = tk.Tk()
    root.title("일본어 OCR 추출기")
    root.geometry("320x160")
    tk.Label(
        root,
        text="이미지에서 일본어를 추출합니다\n(결과는 콘솔에 출력됩니다)",
        pady=20,
    ).pack()
    tk.Button(
        root, text="이미지 선택", command=on_select, width=20, height=2
    ).pack()
    root.mainloop()


if __name__ == "__main__":
    main()
