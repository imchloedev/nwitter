# Firebase Authorzation *v9*

### 1. Create New Account
```javascript
createUserWithEmailAndPassword(authservice, email, password)
```
Promise 함수를 리턴한다. 


### 2. Sign in 
```javascript
signInWithEmailAndPassword(authService, email, password) 
```
Promise 함수를 리턴한다.

### 3. Check user's state
Auth.onAuthStateChanged()
사용자의 로그인 상태 변경에 대해 체크하는 함수이다.
```javascript
useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
````



