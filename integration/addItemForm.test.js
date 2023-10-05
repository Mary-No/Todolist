describe('addItemForm', ()=>{
    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/iframe.html?id=todolists-additemform--add-item-form-story');
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});