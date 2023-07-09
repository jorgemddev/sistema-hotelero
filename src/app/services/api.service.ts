import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpEvent,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Responses } from '../models/interfaces/responses';
import { Products } from '../models/interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public domain: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }
  
  isLogged(): Observable<any> {
    return this.http.get<Responses>(this.domain + 'user/index/auth/');
  }
  login(form:UntypedFormGroup): Observable<Responses> {

    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(this.domain + 'user/access/login/', body, {
      headers: new HttpHeaders().set(
        'Content-Type',
        'application/x-www-form-urlencoded'
      ),
    });
  }
  validatePass(token: string): Observable<Responses> {
    return this.http.get<Responses>(this.domain + 'user/index/islinkvalid/' + token);
  }
  restorePass(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'user/access/restore/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  getUser(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'user/index/' + id
    );
  }
  getUsers(page:number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'user/index/paginate/' + page + '/30/'
    );
  }
  getCompany(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'company/index/'
    );
  }
  getProfile(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'user/profile/'
    );
  }
  getSlider(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/sliders/' + id
    );
  }

  getSliders(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/sliders/'
    );
  }
  getTypePayments(){
    return this.http.get<Responses>(
      this.domain + 'company/info/typePayment/'
    );
  }
  getRoom(id:number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/rooms/'+id
    );
  }
  getBrands(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/brands/'
    );
  }
  listBrands(page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/brands/list/' + page
    );
  }
  listRooms(page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/rooms/list/' + page
    );
  }
  getAllRooms(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/rooms'
    );
  }
  getRoomsAvailable(form: UntypedFormGroup): Observable<Responses> {
    const params = new HttpParams()
    .set('reservations_id',form.get('reservations_id')?.value)
      .set('start', form.get('start')?.value)
      .set('end', form.get('end')?.value);

    return this.http.get<Responses>(
      this.domain + 'hotel/rooms/available', { params }
    );
  }
  filterAllReservations(form: UntypedFormGroup): Observable<Responses> {
    const params = new HttpParams()
      .set('start', form.get('start')?.value)
      .set('end', form.get('end')?.value);

    return this.http.get<Responses>(
      this.domain + 'hotel/reservations/filter', { params }
    );
  }
  allRangeReservations(form: UntypedFormGroup): Observable<Responses> {
    const params = new HttpParams()
      .set('start', form.get('start')?.value)
      .set('end', form.get('end')?.value);

    return this.http.get<Responses>(
      this.domain + 'hotel/reservations/allRange', { params }
    );
  }
  detailReservations(form: UntypedFormGroup): Observable<Responses> {
    const params = new HttpParams()
      .set('id', form.get('id')?.value)
      .set('start', form.get('start')?.value)
      .set('end', form.get('end')?.value);

    return this.http.get<Responses>(
      this.domain + 'hotel/reservations/detail', { params }
    );
  }
  getBrand(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/brands/' + id
    );
  }
  getFamilys(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/familys/'
    );
  }
  listFamilys(page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/familys/list/' + page
    );
  }
  getFamilyFathers(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/familys/fathers/'
    );
  }
  getFamily(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/familys/' + id
    );
  }
  getModels(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/models/'
    );
  }
  getFilterModels(brand_id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/models/filter/' + brand_id
    );
  }
  getReservation(reservation_id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/reservations/' + reservation_id
    );
  }

  getReservationByRut(rut: string): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/reservations/byRut/' + rut
    );
  }
  getModel(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/models/' + id
    );
  }
  getExtension(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/index/' + id
    );
  }
  getExtensions(page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/index/list/' + page
    );
  }
  getNav(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/navs/' + id
    );
  }
  getNavs(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/navs/'
    );
  }
  getAllNavs(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/navs/all/'
    );
  }
  getPaths(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/navs/paths/'
    );
  }
  getSettingAlliance(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/alliance/'
    );
  }
  getNews(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'news/index/' + id
    );
  }
  getPage(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'pages/index/' + id
    );
  }
  getProvider(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'providers/index/' + id
    );
  }
  getClient(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'clients/index/' + id
    );
  }
  getCarsParking(reservations_id: number,page:number): Observable<Responses> {
    const params = new HttpParams()
      .set('reservations_id', reservations_id)
    return this.http.get<Responses>(
      this.domain + 'hotel/cars/paginate/'+    page +
      '/30/' , { params }
    );
  }
  getListPayments(reservations_id: number,page:number): Observable<Responses> {
    const params = new HttpParams()
      .set('reservations_id', reservations_id)
    return this.http.get<Responses>(
      this.domain + 'hotel/payments/paginate/'+    page +
      '/30/' , { params }
    );
  }
  getAllPaymentCash(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/payments/cash/'
    );
  }
  getListCharges(reservations_id: number,page:number): Observable<Responses> {
    const params = new HttpParams()
      .set('reservations_id', reservations_id)
    return this.http.get<Responses>(
      this.domain + 'hotel/charges/paginate/'+    page +
      '/30/' , { params }
    );
  }
  getAllCharges(reservations_id: number): Observable<Responses> {
    const params = new HttpParams()
      .set('reservations_id', reservations_id)
    return this.http.get<Responses>(
      this.domain + 'hotel/charges/', { params }
    );
  }
  searchClientByRut(rut: string): Observable<Responses> {
    const params = new HttpParams()
      .set('rut', rut)
    return this.http.get<Responses>(
      this.domain + 'clients/index/searchByRut', { params }
    );
  }
  getContact(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'contacts/index/' + id
    );
  }
  getNote(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/notes/' + id
    );
  }
  getParking(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/cars/' + id
    );
  }
  getRegion(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/regions/'
    );
  }
  getCities(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/cities/list/'
    );
  }
  getAllAmenities(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/amenities/'
    );
  }
  getAllAmenitie(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'hotel/amenities/' + id
    );
  }
  getProviders(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'providers/index/'
    );
  }
  getPayments(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/payments/'
    );
  }

  getCitiesPaginateFilter(filter: string, page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +
      'params/cities/list/' +
      page +
      '/30/' +
      filter
    );
  }
  getPurchasesProvidersFilter(
    id: number,
    page: number
  ): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +
      'providers/purchase/filter/' +
      id +
      '/' +
      page +
      '/30/'

    );
  }
  getPurchase(
    id: number
  ): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +
      'providers/purchase/' +
      id

    );
  }
  getContactsFilter(
    id: number,
    filter: string,
    page: number
  ): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +
      'contacts/index/filter/' +
      id +
      '/' +
      filter +
      '/' +
      page +
      '/30/'

    );
  }

  getNotesFilter(
    id: number,
    filter: string,
    page: number
  ): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain +
      'params/notes/filter/' +
      id +
      '/' +
      filter +
      '/' +
      page +
      '/30/'

    );
  }
  listNews(page: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'news/index/list/' + page + '/30/'
    );
  }
  listProviders(page: number, perpage: number = 30): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'providers/index/list/' + page + '/' + perpage + '/'
    );
  }
  listClients(page: number, perpage: number = 30): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'clients/index/list/' + page + '/' + perpage + '/'
    );
  }
  listMovements(q: string, filter: number, page: number, perpage: number = 30): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/movements/list/' + page + '/' + perpage + '/' + filter + '/' + q
    );
  }
  searchProducts(form: UntypedFormGroup, page: number): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/index/search/' + page + '/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

  getProduct(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'products/index/' + id
    );
  }
  getAllCities(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/cities/all/'
    );
  }
  getAllCitiesFull(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/cities/allfull/'
    );
  }
  getCitiesFilter(filter: string): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/regions/filter/' + filter
    );
  }
  getState(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/state/'
    );
  }
  getCategorys(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'news/category/'
    );
  }
  getCategory(id: number): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'news/category/' + id + '/'
    );
  }
  searchNews(form: UntypedFormGroup, page: number): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'news/index/search/' + page + '/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  searchProviders(form: UntypedFormGroup, page: number): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain +
      'providers/index/search/' +
      page +
      '/'
      ,
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  searchPurchases(form: UntypedFormGroup, page: number): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain +
      'providers/purchase/search/' +
      page +
      '/'
      ,
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  searchPages(form: UntypedFormGroup, page: number): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'pages/index/search/' + page + '/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  getIcons(page: number, perpage: number = 20): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'extensions/icons/list/' + page + '/' + perpage + '/'
    );
  }
  getImages(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'company/images/'
    );
  }
  getPrivileges(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'params/privileges/'
    );
  }
  getCompanys(): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'company/index/'
    );
  }
  checkUser(username: string): Observable<Responses> {
    return this.http.get<Responses>(
      this.domain + 'user/index/check/' + username
    );
  }
  createUser(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);

    return this.http.post<Responses>(
      this.domain + 'user/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createNews(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'news/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createBrand(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/brands/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createFamily(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/familys/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createReservations(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/reservations/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createModel(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/models/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createPage(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'pages/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createSlider(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/sliders/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createAlliance(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/alliances/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createNavs(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'params/navs/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createExtentions(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

  createCategory(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'news/category/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createProduct(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createProviders(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'providers/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createClients(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'clients/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createRooms(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/rooms/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createAmenities(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/amenities/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createAmenitie(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/amenitie/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createPurchase(form: UntypedFormGroup, products: any): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value).append('products', JSON.stringify(products));
    return this.http.post<Responses>(
      this.domain + 'providers/purchase/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createContact(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'contacts/index/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createNote(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'params/notes/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createCars(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/cars/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateCars(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/cars/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateImage(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'company/images/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateProduct(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateExtensions(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateContact(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'contacts/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateNote(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'params/notes/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updatePage(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'pages/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateNavs(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'params/navs/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateAmenities(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/amenities/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateProviders(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'providers/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateClients(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'clients/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createPayments(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/payments/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  createCharges(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/charges/create/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updatePurchase(form: UntypedFormGroup, products: any): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value).append('products', JSON.stringify(products));
    return this.http.post<Responses>(
      this.domain + 'providers/purchase/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateSettingAlliance(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/alliance/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  setStatusRoom(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/rooms/status/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateCategory(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'news/category/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateNews(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'news/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  frontPageNew(id: number): Observable<Responses> {
    const body = new HttpParams().set('id', id);
    return this.http.post<Responses>(
      this.domain + 'news/index/front/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateUserPass(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams()
      .set('pass', form.get('pass')?.value)
      .set('id', form.get('id')?.value);
    return this.http.post<Responses>(
      this.domain + 'user/index/pass/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updatePass(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams()
      .set('pass', form.get('pass')?.value)
      .set('npass', form.get('npass')?.value);
    return this.http.post<Responses>(
      this.domain + 'user/profile/pass/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateProfile(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'user/profile/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateReservations(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/reservations/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateRooms(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/rooms/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateCompany(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'company/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateUser(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'user/index/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateBrands(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/brands/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateFamilys(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/familys/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  updateModel(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/models/update/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  checkIn(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/reservations/checkin/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  checkOut(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/reservations/checkout/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deletePages(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);
    return this.http.post<Responses>(
      this.domain + 'pages/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteExtensions(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);
    return this.http.post<Responses>(
      this.domain + 'extensions/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteNews(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);
    return this.http.post<Responses>(
      this.domain + 'news/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteCategory(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'news/category/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteUser(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'user/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteOrdersPurchase(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'providers/purchase/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteClients(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'clients/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteProviders(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'providers/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteContacts(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'contacts/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteNote(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'params/notes/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteProducts(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'products/index/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteRooms(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'hotel/rooms/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteReservation(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'hotel/reservations/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteMovements(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().set('id', form.get('id')?.value);

    return this.http.post<Responses>(
      this.domain + 'products/movements/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteNavs(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'params/navs/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteBrands(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/brands/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteFamilys(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/familys/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteAmenities(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/amenities/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  removeService(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'hotel/amenitie/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteModel(form: UntypedFormGroup): Observable<Responses> {
    const body = new HttpParams().appendAll(form.value);
    return this.http.post<Responses>(
      this.domain + 'products/models/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }
  deleteImage(id: number): Observable<Responses> {
    const body = new HttpParams().set('id', id);
    return this.http.post<Responses>(
      this.domain + 'company/images/delete/',
      body,
      {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      }
    );
  }

  getImage(id: number) {
    return this.domain + 'download/image/' + '&id=' + id;
  }
  //Metodo que envia los archivos al endpoint /upload

}