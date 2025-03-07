# Tangram FO Frontend

> Landing Pages Viewer


### **Run https in localhost**

Step 1: Install mkcert

```
brew install mkcert
```

Check install

```
mkcert -install
```

Step 2: Create cert

Create folder **_certificates_**

```
cd certificates
```

Create certificate for domain **local-doitac.uat.shopee.vn**

```
mkcert      local-doitac.uat.shopee.vn
```

Step 3: Set host

```
127.0.0.1       local-doitac.uat.shopee.vn
```

Step 4: Run server

```
yarn run dev-local
```

Step 5: Access  **https://local-doitac.uat.shopee.vn**
