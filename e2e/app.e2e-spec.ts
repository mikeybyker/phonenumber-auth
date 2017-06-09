import { PhoneAuthPage } from './app.po';

describe('phone-auth App', () => {
  let page: PhoneAuthPage;

  beforeEach(() => {
    page = new PhoneAuthPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
