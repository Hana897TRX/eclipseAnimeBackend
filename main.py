import FLVServer
import mysql.connector
import pandas as pd
import os
import glob

cnx = mysql.connector.connect(host='localhost',user='root', database='eclipseanime')
def main():
    delete = False
    option = 0
    
    while(True):
        print('Welcome to Anime system. Select an option')
        print('1) Get Anime Info')
        print('2) Upload to DB')
        print('3) Upload to Sheets')
        print('4) Select anime server')
        print('5) Enable delete after insert')

        option =  int(input('Select and option number\n'))
        
        if(option == 1):
            FLVServer.getAnimeInfo(input('Introduce anime URL Page'))
        elif(option == 2):
            upload_db(delete)
        elif(option == 3):
            FLVServer.getAnimeChapters(input('Introduce anime chapter URL Page'))
        elif(option == 5):
            delete = not(delete)
            print('Deletion is: ' + str(delete))

def upload_db(delete):
    print('Getting info files')
    path = os.getcwd()
    csv_files_info = glob.glob(os.path.join(path, "*_info.csv"))
    print('info files are ready')
    cursor = cnx.cursor()

    add_anime = "INSERT INTO `anime` (`anime_id`, `animeServer_id`, `anime_type_id`, `animeName`, `longName`, `synopsis`, `imgCover`, `imgPoster`, `totalVotes`, `rating`) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    for f in csv_files_info:   
        print('Inserting...' + os.path.basename(f)) 
        data = pd.read_csv(f)
        data.head()
        try:
            for i, row in data.iterrows():
                cursor.execute(add_anime, tuple(row))
                print('Record is inserted')
                cnx.commit()
        except:
            print('Record is already inserted')

        if delete:
            os.remove(f)

    add_chapters = "INSERT INTO `animechapters` (`chapter_id`, `anime_id`, `imagePath`, `chapterNumber`, `animeLink`) VALUES (0, %s, %s, %s, %s) "
    print('getting chapter files')
    csv_chapter_files = glob.glob(os.path.join(path, "*_chapters.csv"))
    print('chapter files are ready')

    for x in csv_chapter_files:
        print('inserting...' + os.path.basename(x))
        data = pd.read_csv(x)
        data.head()

        try:
            for i, row in data.iterrows():
                print(row)
                cursor.execute(add_chapters, tuple(row))
                print('Record is inserted')
                cnx.commit()
        except:
            print('Record is already inserted')
        if delete:
            os.remove(x)
        
    print('INFORMATION IS ALREADY UPLOADED')
            

if __name__ == "__main__":
    main()