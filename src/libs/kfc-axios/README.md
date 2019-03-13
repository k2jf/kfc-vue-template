# kfc-axios
generic fetch plugin with integration of iview $notice popup and token management

## maintainer
zhangzhenbang

## install
1. add axios dependency in npm
    ```bash
    npm install --save axios
    ```
2. clone kfc-axios into `src/plugins`
    ```bash
    git remote add -f kfc-axios https://github.com/k2jf/kfc-axios.git
    git subtree add -P src/plugins/kfc-axios kfc-axios master --squash
    ```
3. import and use in `main.js`
    ```js
    /* main.js */
    import kfcAxios from 'plugins/kfc-axios'
    
    // and, before new Vue() ...
    Vue.use(kfcAxios)
    ```

> **optional** here inside `Vue.use(...)`, you can specify some options
> ```js
> Vue.use(kfcAxios, {
>   baseUrl: 'baseUrl-can-be-overridden-per-request.com',
>   keyName: 'key-of-the-auth-header', // default to 'K2_KEY'
>   login: function () {
>     window.location.href = '...'
>   } 
> })
> ``` 
> 

## what you get from this routine
- one axios instance

  - `this.$axios` (**preferred**, in components only)
  - `global.axios` (used in src/api)
  
- automatically 302/400+/500+ status handling

  - `302/401`: a poptip with message '登录信息失效，请重新登录！' 
  followed by custom `login()` and a  
  rejected Promise (`err.message === 'need login'`)
  
  - `403`: a poptip with message '操作被阻止：权限不足' and a  
  rejected Promise (`err.message === 'forbidden'`)
  
  - `404`: a poptip with message like '\[404 Not Found] 您要访问的接口不存在...' and a  
  rejected Promise (`err.message === '404'`)
  
  - `500`: a poptip with message like '服务器开小差了：...' and a  
  rejected Promise (`err.message === 'api server error'`)
  
  - others please see the code
  
## other ways of customization

- `this.$axios.updateBaseUrl(newBaseUrl)`  
  globally change the axios's base url
  
- `this.$axios.updateToken(newToken)`  
  globally change the auth token
  
- `this.$axios.updateLoginMethod(loginMethod)`  
  globally change the login method (where you can use router)
  
  ```js
  /* App.vue */
  ...
  created () {
    const that = this
    this.$axios.updateLoginMethod(function () {
      that.$Message.warning('This is a warning tip') // an iview message popup
      that.$router.push('/login?from=xxx'); // jump to login with params
    })
  }
  ```
  
## how to use axios?

basically this is an axios's implementation so usage are the same. See 
[the doc](https://github.com/axios/axios) for help. Here are some examples:

1. basic GET, with all code in component
    ```js
    // inline use in Welcome.vue
    export default {
      data () {
        return {...}
      },
      created () {
        // GET <baseUrl>/sys/notice?since=1552465248791
        this.$axios.get(`/sys/notice`, {since: 1552465248791}).then(res => {
          /*
             res ~~> http response, with
             - data: the response body (see below)
             - status: status code, like 200
             - statusText: standard HTTP status text, like 'Not Found'
             - headers: response headers
             
             res.data ~~> the response body, here is
             {
                data: [{...},{...},{...}],
                total: 3,
                message: 'success',
                since: 1552465248791         
             }
           */
          this.newsList = res.data.data
        })
      }
    }
    ```

2. basic GET, with API call extracted to `src/api/sample.js`
    ```js
    // design in src/api/sample.js
    export const listMsCategory = () => {
      return global.axios.get(`/ms/category/trees`).then(res => {
        return res.data.data.map(item => ({
          id: item.id,
          pId: item.parentId,  
          name: item.categoryName,
          msCount: parseInt(item.msCount) || 0
        }))
      })
    }
    
    // ...and use in MicroServiceMgr.vue
    import {listMsCategory} from '@/api/sample'
    export default {
      mounted () {
        listMsCategory().then(data => {
          // process your data
        }).catch(err => {
          // ... if you DO need to handle err
        })
      }
    }
    ```
3. basic GET, but mute the errer popups
    ```js
    export default {
      data () {
        return {
          tableData: [],
          tableDataFetchTimer: null,
          quryParamsObj: {
            wfid: '100644',
            wtid: '003',
            startTime: 1552466274476
          }
        }
      },
      methods: {
        fetchData () {
          // <baseUrl>/pas/jobs?wfid=100644&wtid=003&startTime=1552466274476
          this.$axios.get(`/pas/jobs`, this.queryParamsObject, {silent: true})
          
          // use 'silent: true' to mute the popups
          .then(res => {
            this.tableData = res.data
          })
        }
      },
      created () {
        // initialize this.tableData
        this.fetchData()
      },
      mounted () {
        this.tableDataFetchTimer = setInterval(this.fetchData, 3000)
      },
      beforeDestroy () {
        clearInterval(this.tableDataFetchTimer)
      }
    }
    ```

4. basic POST
```js
export default {
  methods: {
    handleLogin (username, password) {
      // POST <baseUrl>/login
      // the 2nd argument here goes to request body, not query string
      this.$axios.post(`/login`, {username: username, password: password}).then(res => {
        const permissions = res.data.permissions
        // further processing...
      })
    }
  }
}
```

(more to be added...) 

### New!  
now you have option `silent` to prevent the error popup when network error:

```js

```
