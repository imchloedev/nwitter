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
```

### 4. Log-in with Google
GoogleAuthProvider(), signInWithPopup()
```javascript
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };
```
- signInWithPopup(auth, provider)
- provider 는 인증 제공자로 AuthCredential 생성을 용이하게 하는 데 사용되는 인증 공급자를 나타내는 인터페이스이다. (either Google, Github, or Facebook)


