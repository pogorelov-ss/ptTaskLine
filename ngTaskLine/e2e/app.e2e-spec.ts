import { PivotalKottansPage } from './app.po';

describe('pivotal-kottans App', function() {
  let page: PivotalKottansPage;

  beforeEach(() => {
    page = new PivotalKottansPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
