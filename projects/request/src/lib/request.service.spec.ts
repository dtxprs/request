import { of, throwError } from 'rxjs';
import { RequestService } from './request.service';
import { ResponseError } from './types/response-error';

describe('RequestService', () => {
  // beforeEach(() => TestBed.configureTestingModule({}));
  //
  // it('should be created', () => {
  //   const service: RequestService = TestBed.get(RequestService);
  //   expect(service).toBeTruthy();
  // });

  let request: RequestService;
  let httpClientSpy;
  const errorResponse = {success: false};
  const errorParams: ResponseError<{}> = {
    operation: 'Test operation',
    serviceName: 'TestService',
    result: errorResponse
  };

  beforeEach(() => {
    // create `subscription` spy on an object representing the Subscription
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    request = new RequestService(httpClientSpy);
  });

  it('test get() method', (done) => {
    expect(request).toBeTruthy();

    httpClientSpy.get.and.returnValue(of(1));

    // call get() method
    request.get('testUrl', errorParams).subscribe((response) => {
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(1);
      done();
    });
  });

  it('test post() method', (done) => {
    httpClientSpy.post.and.returnValue(of(2));

    // call post() method
    request.post('testUrl', {}, errorParams, {}).subscribe((response) => {
      expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
      expect(response).toBe(2);
      done();
    });
  });

  it('get() method throw an error', (done) => {
    httpClientSpy.get.and.returnValue(throwError({
      error: 'Test error',
      status: 123,
      statusText: 'Test statusText'
    }));

    // call get() method
    request.get('testUrl', errorParams, {}).subscribe((response) => {
      done.fail('Success subscriber has been called!')
    }, (error) => {
      expect(error).toBe(errorResponse);
      done();
    });
  });


  it('post() method throw an error', (done) => {
    httpClientSpy.post.and.returnValue(throwError(
      {
        error: {message: 'Test error message'}
      }
    ));

    // call post() method
    request.post('testUrl', {}, errorParams).subscribe((response) => {
      done.fail('Success subscriber has been called!')
    }, (error) => {
      expect(error).toBe(errorResponse);
      done();
    });
  });

  it('test get() method with empty error params', (done) => {
    expect(request).toBeTruthy();

    httpClientSpy.get.and.returnValue(of(1));

    // call get() method
    request.get('testUrl', {}).subscribe((response) => {
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
      expect(response).toBe(1);
      done();
    });
  });
});
