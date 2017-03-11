import { ZenythangularPage } from './app.po';

describe('zenythangular App', function() {
  let page: ZenythangularPage;

  beforeEach(() => {
    page = new ZenythangularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
