from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

def run_tests(env):
    grid_url = "http://selenium-grid:4444/wd/hub"
    app_url = f"http://uygulama-adi-{env}.example.com"
    
    options = webdriver.ChromeOptions()
    driver = webdriver.Remote(
        command_executor=grid_url,
        options=options
    )
    
    try:
        driver.get(app_url)
        assert "Ana Sayfa" in driver.title
        print(f"✅ {env} testi başarılı!")
    except AssertionError:
        print(f"‼️ Hata: {env} arayüz testi başarısız!")
        raise
    finally:
        driver.quit()

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser()
    parser.add_argument("--env", required=True)
    args = parser.parse_args()
    run_tests(args.env)
