from PIL import Image
import random
import os

dir_ = "C:\Projects\personal\Reels\pngs"

reel1_no_symbols = 50
reel2_no_symbols = 58
reel3_no_symbols = 55

files_ = os.walk(dir_)
filenames = [_ for _ in files_]
files = [filenames[0][0]+os.sep+each for each in filenames[0][-1]]


reel_sequence1 = random.choices(range(1, 15), k=reel1_no_symbols)
reel_sequence2 = random.choices(range(1, 15), k=reel2_no_symbols)
reel_sequence3 = random.choices(range(1, 15), k=reel3_no_symbols)


# reel1 = Image.new("RGBA", (400, 400*reel1_no_symbols), (0, 0, 0, 0,))
# reel2 = Image.new("RGBA", (400, 400*reel2_no_symbols), (0, 0, 0, 0,))
# reel3 = Image.new("RGBA", (400, 400*reel3_no_symbols), (0, 0, 0, 0,))

reel1 = Image.new("RGBA", (400*reel1_no_symbols, 400), (0, 0, 0, 0,))
reel2 = Image.new("RGBA", (400*reel2_no_symbols, 400), (0, 0, 0, 0,))
reel3 = Image.new("RGBA", (400*reel3_no_symbols, 400), (0, 0, 0, 0,))


indx = 0
while reel_sequence1:
    sym = reel_sequence1.pop(0)
    indx += 1
    _file = filenames[0][0]+"\\"+str(sym)+".png"
    reel1.paste(Image.open(_file), (400*indx, 0), mask=Image.open(_file))


indx = 0
while reel_sequence2:
    sym = reel_sequence2.pop(0)
    indx += 1
    _file = filenames[0][0]+"\\"+str(sym)+".png"
    reel2.paste(Image.open(_file), (400*indx, 0), mask=Image.open(_file))


indx = 0
while reel_sequence3:
    sym = reel_sequence3.pop(0)
    indx += 1
    _file = filenames[0][0]+"\\"+str(sym)+".png"
    reel3.paste(Image.open(_file), (400*indx, 0), mask=Image.open(_file))

# reel1.show()
reels_dir = r"C:\Projects\personal\Reels\reels"
reel1.save(reels_dir+os.sep+"reels1.png")
reel2.save(reels_dir+os.sep+"reels2.png")
reel3.save(reels_dir+os.sep+"reels3.png")
