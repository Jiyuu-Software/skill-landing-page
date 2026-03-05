import asyncio
from playwright.async_api import async_playwright
import time

async def capture_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1280, "height": 1000})
        await page.goto("http://localhost:8000/#pricing")
        await page.wait_for_timeout(1000)
        
        # Take full page screenshot to see the background
        await page.screenshot(path="full_page_verification.png", full_page=True)
        await browser.close()
        print("Screenshot saved to full_page_verification.png")

asyncio.run(capture_screenshot())
