import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class Login extends StoreModule {

  initState() {
    return {
      data: { f: 's' },

    }
  }

  async logout() {
    console.log('logout')
    const token = localStorage.getItem('token');
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      }
    });
    const json = await response.json();
    this.store.actions.session.removeToken('token');
    console.log(json);
  }

  async getUserInfo() {
    console.log(this.store.actions.session.checkAuthorization())
    const token = this.store.actions.session.getToken();
    console.log(token)
    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      }
    });
    const json = await response.json();

    this.setState({
      ...this.getState(),
      data: json.result
    }, 'Данные пользователя');
    console.log(json);
  }
}

export default Login;
