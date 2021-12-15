from selenium import webdriver
import time 
import math
import pandas as pd
import _thread
import requests
from bs4 import BeautifulSoup

#GET INFO FROM ANIMEFLV CHAPTERS

def getAnimeInfo(animeURL):
    FILE_PATH_FOLDER = 'C:/Users/Hana897TRX/Documents/University/Projects/Android/EclipseAnime Backend/AnimeChaptersData'
    search_query = ''
    driver = webdriver.Chrome(executable_path='C:\Program Files\Google\Chrome\Application\chromedriver.exe')
    search_query = animeURL
    anime_infoX = []
    anime_id = 0

    driver.get(search_query)
    driver.implicitly_wait(5)

    server_id = 1
    anime_name = driver.find_element_by_xpath("//h1[@class='Title']").text
    try:
        anime_longName = driver.find_element_by_xpath("//span[@class='TxtAlt']").text
    except:
        anime_longName = anime_name
    anime_type = driver.find_element_by_xpath('//span[@class="Type tv"]').text
    anime_cover = driver.find_element_by_xpath('//div[@class="AnimeCover"]/div/figure/img').get_attribute('src')
    anime_background = "https://www3.animeflv.net/" + driver.find_element_by_xpath('//div[@class="Bg"]').get_attribute('style').split('(')[1].split(')')[0].rstrip()
    anime_genres = driver.find_elements_by_xpath('//nav[@class="Nvgnrs"]/a')
    anime_synopsis = driver.find_element_by_xpath('//div[@class="Description"]').text
    anime_rating = '0'
    anime_votes = '0'
    anime_id = driver.execute_script('return anime_info[0]')

    if(anime_type == 'ANIME'):
        anime_type_id = 1
    else:
        anime_type_id = 2

    anime_info = [anime_id, server_id, anime_type_id, anime_name, anime_longName, anime_synopsis, anime_cover, anime_background, anime_votes, anime_rating]
    anime_infoX.append(anime_info)
    anime_info_df = pd.DataFrame(anime_infoX)
    anime_info_df.columns = ['anime_id', 'server_id', 'anime_type_id', 'animeName', 'longName', 'synopsis', 'imgCover', 'imgPoster', 'totalVotes', 'rating']
    
    anime_info_df.to_csv(anime_name + '_info.csv', index=False)
    getAnimeChapters(driver)


def getAnimeChapters(driver):
    #FILE_PATH_FOLDER = 'C:/Users/Hana897TRX/Documents/University/Projects/Android/EclipseAnime Backend/AnimeChaptersData'
    anime_chapters = []

    time.sleep(5)
    driver.execute_script('var limit = 25')
    totalEpisodes = driver.execute_script('return episodes.length')
    anime_id = driver.execute_script('return anime_info[0]')

    for i in range(25, totalEpisodes):
        driver.execute_script("appendEpisode(" + str(i) + ")")

    anime_list = driver.find_elements_by_xpath("//li[@class='fa-play-circle']")
    anime_title = anime_list[0].find_elements_by_xpath(".//h3")[0].text

    for chapter in anime_list:
        #print(chapter.get_attribute('innerHTML'))
        episodeLink = chapter.find_elements_by_xpath('.//a')[0].get_attribute('href')
        episodeNumber = chapter.find_elements_by_xpath('.//p')[0].text
        episodeImg = chapter.find_elements_by_xpath(".//img")[0].get_attribute('data-src')
        if(episodeImg == None):
            episodeImg = chapter.find_elements_by_xpath(".//img")[0].get_attribute('src')
        chapter_details = [anime_id, episodeImg, episodeNumber, episodeLink]
        
        #_thread.start_new_thread( GetServerByChapter, (episodeLink, episodeNumber, anime_id, anime_title + "_servers.csv") )

        anime_chapters.append(chapter_details)

    driver.quit()

    anime_chapters_df = pd.DataFrame(anime_chapters)
    anime_chapters_df.columns = ['anime_id', 'imagePath', 'chapterNumber', 'animeLink']
    anime_chapters_df.to_csv(anime_title + '_chapters.csv', index=False)

    print('Ready')

def GetServerByChapter(chapterURL, chapter_number, anime_id, file_name):
    search_query = chapterURL
    driver = webdriver.Chrome(executable_path='C:\Program Files\Google\Chrome\Application\chromedriver.exe')
    driver.get(search_query)
    time.sleep(5)
    #page = requests.get(chapterURL)
    #soup = BeautifulSoup(page.content, "html.parser")
    servers = driver.execute_script('return videos')
    driver.quit();
    print(servers)