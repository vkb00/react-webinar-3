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
  async recoveryAuthorizationApp() {
    const token = this.getToken();

    if (token) {

      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          "Content-Type": "application/json",
          "X-Token": token,
        }
      });
      const json = await response.json();

      console.log(json.result);
      if (json.result) {
        this.setState({
          ...this.getState(),
          authorization: true
        }, 'Изменение авторизации');

      }

    }
  }
  async recoveryAuth(setSession) {
    const token = this.getToken();
    if (!token) {
      setSession(false);
      return 0;
    }
    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      }
    });
    const json = await response.json();
    if (json)
      setSession(true)
    else
      setSession(false);
    console.log(json)
  }
  async recoveryAuthorization(setAuth, setLoading) {
    setLoading(true);
    const token = this.getToken();
    if (!token) {
      setLoading(false);
      setAuth(false);
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
        setAuth(true);
        this.setState({
          ...this.getState(),
          authorization: true
        }, 'Изменение авторизации');

      }
      else
        setAuth(false);


    }
    catch {
      console.log('catch');
      setAuth(false);
    }
    finally {
      console.log('final');
      setLoading(false);
      console.log()
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
