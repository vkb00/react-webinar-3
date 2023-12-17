import StoreModule from "../module";

/**
 * Детальная информация о товаре для страницы товара
 */
class Session extends StoreModule {

  initState() {
    return {
      authorization: false
    }
  }
  getToken() {
    return localStorage.getItem('token');
  }
  setToken(name, token) {
    console.log(name, token)
    localStorage.setItem(name, token);
  }
  removeToken(tokenName) {
    localStorage.removeItem(tokenName);
  }

  async recoveryAuthorization() {

    const token = this.getToken();
    if (!token) {
      return this.store.state.session.authorization;
    }
    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        }
      });
      const json = await response.json();
      console.log('try');
      console.log(json.result);
      if (json.result) {

        this.setState({
          ...this.getState(),
          authorization: true
        }, 'Изменение авторизации');

      }
    }
    catch {
      console.log('catch');
    }
    finally {
      console.log('final');
      return this.store.state.session.authorization;
    }
  }
  checkAuthorization() {
    if (this.authorization)
      return true
    else
      return false
  }
  setAuthorization(isAuthorization) {
    this.setState({
      ...this.getState(),
      authorization: isAuthorization
    }, 'Изменение авторизации');
  }
}

export default Session;
