import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { ProductDto } from '../dtos';


class ApiServiceMock {
    getAllMyProducts(userId : number){
        return [];
    }
    createProduct(userId : number , dto : ProductDto){
        return null;
    }
    updateProduct(userId : number , dto : ProductDto){
        return null;
    }
    deleteProduct(userId : number , productId : number){
        return null;
    }
}
describe.only("ProductService Unit Tests", () => {

  let productService: ProductService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ProductService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService, ApiServiceProvider
      ],
    }).compile();
    productService = module.get<ProductService>(ProductService);
  })

  it('should call getAllMyProducts method', async () => {
    const getAllMyProductsSpy = jest.spyOn(productService, 'getAllMyProducts');
    const userId : number = 1;
    productService.getAllMyProducts(userId);
    expect(getAllMyProductsSpy).toHaveBeenCalled();
    expect(getAllMyProductsSpy).toHaveBeenCalledWith(userId);
  });

  it('should call createProduct method with expected payload', async () => {
    const createProductSpy = jest.spyOn(productService, 'createProduct');
    const userId : number = 1;
    const productDto = new ProductDto();
    productService.createProduct(userId , productDto);
    expect(createProductSpy).toHaveBeenCalled();
    expect(createProductSpy).toHaveBeenCalledWith(userId , productDto);
  });

  it('should call updateProduct method with expected payload', async () => {
    const updateProductSpy = jest.spyOn(productService, 'updateProduct');
    const userId : number = 1;
    const productDto = new ProductDto();
    productService.updateProduct(userId , productDto);
    expect(updateProductSpy).toHaveBeenCalled();
    expect(updateProductSpy).toHaveBeenCalledWith(userId , productDto);
  });

  it('should call deleteProduct method', async () => {
    const deleteProductSpy = jest.spyOn(productService, 'deleteProduct');
    const userId : number = 1;
    const productId : number = 1;
    productService.deleteProduct(userId , productId);
    expect(deleteProductSpy).toHaveBeenCalled();
    expect(deleteProductSpy).toHaveBeenCalledWith(userId , productId);
  });
})