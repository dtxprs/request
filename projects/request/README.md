Request service
=====
1. [Description](#description)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Methods](#methods)
5. [Git repository](#git)
6. [Run tests](#testing)
7. [Build](#build)
8. [Publish to npm](#publish)
9. [Version](#version)

### <a name="description"></a>1. Description
`RequestService` is an extension of the HttpClient service which is implementing the 
error handling method on top of `get()` and `post()` methods 
  
### <a name="installation"></a>2. Installation
Install the module into your application and save it as a dev 
dependency in your `package.json` file  
```
npm install @ridder/request --save-dev
```

### <a name="usage"></a>3. Usage
In order to use the `RequestService` you have to:
1. Include the `RequestModule` in the app's imports list:
   ```typescript
     import { RequestModule } from '@ridder/request';
     //...
     imports: [
       //...
       RequestModule
       //...
     ]
   ```
2. inject the `RequestService` via dependency injection 
into your services/components and use it:
   ```typescript
    import { RequestService } from '@ridder/request';
    //...
    export class AppComponent implements OnInit{
    
      constructor(private request: RequestService) {
      }
    
      ngOnInit() {
        this.request.get('/assets/test.json').subscribe((response)=>{
          console.log('Response:', response);
        })
      }
    }
   ```
  
### <a name="methods"></a>4. Methods
  
#### get<T>(url: string, errorParams?: ResponseError<T>, httpOptions: any = {}): Observable<T>
Performs an http get request.
  
*Parameters:*  
**url** - url to be requested.  
**errorParams** - `optional` default error parameters and data which should be returned back in 
case of an error.  
Structure of the object:
```typescript
{
  serviceName?: string;
  operation?: string;
  result?: T;
}
``` 
where `T` is the type of the data which should be returned back.  
**httpOptions** - `optional` additional http options (headers etc.) used with the request.  
  
*Return:*  
Method returns an `Observable<T>` which contains the response data coming from the server, 
where `T` is the type of the data which should be returned back.    
  
#### post<D, R>(url: string, data: D, errorParams?: ResponseError<R>, httpOptions: any = {}): Observable<R>
Performs an http get request.
  
*Parameters:*  
**url** - url to be requested.  
**data** - data to be send to the server via post request. `D` is the type of data to be sent.  
**errorParams** - `optional` default error parameters and data which should be returned back in 
case of an error.  
Structure of the object:
```typescript
{
  serviceName?: string;
  operation?: string;
  result?: R;
}
``` 
where `R` is the type of the data which should be returned back.  
**httpOptions** - `optional` additional http options (headers etc.) used with the request.  
  
*Return:*  
Method returns an `Observable<R>` which contains the response data coming from the server, 
where `R` is the type of the data which should be returned back.    
  
#### private handleError<T>(serviceName = '', operation = '', result = {} as T)
Handle the error and throws and error observable with the expected result.
  
*Parameters:*  
**serviceName** - `optional` name of the service to be logged within the error message.  
**operation** - `optional` operation to be logged within the error message.  
**result** - `optional` expected result which should be returned back as an error observable.  

*Return:*  
Method returns an error `Observable<T>` which contains the result of type `T`. 
  
  
### <a name="git"></a>5. Git repository
[https://github.com/dtxprs/request](https://github.com/dtxprs/request)

### <a name="testing"></a>6. Run tests
To run the unit tests, use this command:
```
ng test --code-coverage --project=request
```
Current test coverage is 100%!

### <a name="build"></a>7. Build
To build the final package run this command:
```
ng build request
```
The build process will generate the packed sources into the `dist` folder.  

### <a name="publish"></a>8. Publish to npm
To publish the new version to `npm`, go into the `dist` folder:
```
cd ./dist/request
```
and publish it to npm:
```
npm publish --access public
```

### <a name="version"></a>9. Version
1.0.1
