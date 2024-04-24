# Upscale images x2

import os
import sys
import cv2
import numpy as np

# Upscale image x2
def upscale_image(image_path):
    image = cv2.imread(image_path, cv2.IMREAD_UNCHANGED)
    image = cv2.resize(image, (image.shape[1]*2, image.shape[0]*2), interpolation=cv2.INTER_NEAREST)
    new_folder = 'upscaled_images'
    if not os.path.exists(new_folder):
        os.makedirs(new_folder)
    new_image_path = os.path.join(new_folder, os.path.basename(image_path))
    cv2.imwrite(new_image_path, image)

# Upscale all images in folder recursively
def upscale_images_in_folder(folder_path):

    # If the path is a file, upscale the image
    if os.path.isfile(folder_path):
        if folder_path.endswith('.png') or folder_path.endswith('.jpg'):
            upscale_image(folder_path)
    else:
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith('.png') or file.endswith('.jpg'):
                    image_path = os.path.join(root, file)
                    upscale_image(image_path)
            for dir in dirs:
                subdir_path = os.path.join(root, dir)
                upscale_images_in_folder(subdir_path)

# ======================== Main ========================
if __name__ == '__main__':
    if len(sys.argv) == 2:
        upscale_images_in_folder(sys.argv[1])
    else:
        print('Usage: upscale.py <folder_path>')
        sys.exit(1)