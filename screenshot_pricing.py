import asyncio
from playwright.async_api import async_playwright
import time

async def capture_screenshot():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        # Set viewport to something reasonable for desktop view
        await page.set_viewport_size({"width": 1280, "height": 1000})
        await page.goto("http://localhost:8000/#pricing")
        # Wait for any animations and fonts to load
        await page.wait_for_timeout(1000)
        
        # Scroll to pricing section if needed or just take full page screenshot
        # Let's take a screenshot of the pricing section specifically
        pricing_locator = page.locator("#pricing")
        await pricing_locator.screenshot(path="pricing_verification.png")
        
        await browser.close()
        print("Screenshot saved to pricing_verification.png")

asyncio.run(capture_screenshot())
