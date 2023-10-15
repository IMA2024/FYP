from flask import Flask, jsonify, request
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
from selenium.common.exceptions import NoSuchElementException
import openpyxl
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/scrape_zameen', methods=['POST'])
def scrape_zameen():
    try:
        data = request.get_json()

        url = data.get('url')
        callButtonTag = data.get('callButtonTag')
        tableTag = data.get('tableTag')

        # Print the received data for debugging
        print(f"Received URL: {url}")
        print(f"Received Call Button Tag: {callButtonTag}")
        print(f"Received Table Tag: {tableTag}")

        driver = webdriver.Chrome()
        driver.get(url)

        current_button_index = 0
        visited_data = set()

        workbook = openpyxl.Workbook()
        sheet = workbook.active
        sheet.title = "Zameen"

        sheet.append(['Contact Numbers'])

        while True:
            try:
                buttons = driver.find_elements(By.CLASS_NAME, callButtonTag)

                if current_button_index < len(buttons):
                    current_button = buttons[current_button_index]

                    driver.execute_script("arguments[0].scrollIntoView(true);", current_button)
                    driver.execute_script("arguments[0].click();", current_button)

                    time.sleep(2)
                    driver.implicitly_wait(3)
                    html_content = driver.page_source

                    if html_content:
                        soup = BeautifulSoup(html_content, 'html.parser')
                        tables = soup.find_all('table')
                        for table in tables:
                            save = table.find('td', class_=tableTag)
                            save_text = save.span.text if save is not None and save.span else "Empty"
                            if save_text not in visited_data:
                                visited_data.add(save_text)
                                sheet.append([save_text])
                    else:
                        return jsonify({"error": "No HTML content available."})

                    current_button_index += 1
                else:
                    current_button_index = 0
                    visited_data = set()
                    url_parts = url.split('/')
                    last_part = url_parts[-1].split('-')
                    page_number = int(last_part[-1].split('.')[0])
                    page_number += 1

                    # Update the last part of the URL with the new page number
                    last_part[-1] = f"{page_number}.html"
                    url_parts[-1] = '-'.join(last_part)
                    url = '/'.join(url_parts)
                    driver.get(url)

            except NoSuchElementException:
                driver.quit()
                # Add Quit Button to exit the web driver and save file
                workbook.save('Zameen_Numbers.xlsx')
                return jsonify({"message": "Web scraping completed successfully."})

            except Exception as e:
                driver.quit()
                workbook.save('Zameen_Numbers.xlsx')
                return jsonify({"error": str(e)})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
