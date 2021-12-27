import json
from selenium import webdriver
import selenium
from selenium.webdriver.common.by import By
import requests

def refactorAnimeName(animeName) :
    temp = animeName.replace(" ", "-")
    temp = temp.replace(";", "-")
    temp = temp.replace(":", "")

    print(temp)

    return temp

episodeNumber = 0
episodeLanguage = "jp-es"
episodeUrl = ""
episodeDate = ""
episodeImgPath = ""
animeName = "Shigatsu wa Kimi no Uso"

r = requests.get('https://jkanime.net/ajax/ajax_search?q=' + animeName)

data = r.json()

animeId = data["animes"][0]["id"]

page = 1

r = requests.get("https://jkanime.net//ajax/pagination_episodes/" + animeId + "/" + str(page) + "/")
episodesData = r.json()
episodeNumberPageCore = 0

animeName = animeName.lower()

while episodesData != [] :
    for i in range(1, 13) :
        driver = webdriver.Chrome(executable_path='C:\Program Files\Google\Chrome\Application\chromedriver.exe')
        driver.get('https://jkanime.net/' + refactorAnimeName(animeName) + "/" + episodesData[i - 1]["number"])
        print('https://jkanime.net/' + refactorAnimeName(animeName) + "/" + episodesData[i - 1]["number"])
        driver.implicitly_wait(5)
        driver.switch_to.frame(driver.find_element_by_xpath('//iframe'))
        episodeUrl = driver.find_element_by_xpath('//div[@class="dplayer-video-wrap"]/video').get_attribute('src')
        episodeImgPath = 'https://cdn.jkanime.net/assets/images/animes/video/image_thumb/' + episodesData[i - 1]["image"]

        sendData = {
            'animeName' : animeName,
            'episodeNumber' : episodesData[i - 1]["number"],
            'episodeUrl' : episodeUrl,
            'episodeImgPath' : episodeImgPath,
            'episodeDate' : "",
            'episodeLanguage' : "jp-es"
        }

        requests.post('http://localhost:5000/api/v1/saveEpisodes', sendData, True)

    page += 1

    r = requests.get("https://jkanime.net//ajax/pagination_episodes/" + animeId + "/" + str(page) + "/")
    episodesData = r.json()


driver.close()
print("Finish data scrapping")