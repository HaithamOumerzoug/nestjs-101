import { Test, TestingModule } from '@nestjs/testing';

import { ProductDto } from './dtos';
import { ProductController } from './product.controller';
import { ProductService } from './services';

describe("ProductController Unit Tests", () => {
  let productController: ProductController;
  let productService: ProductService
  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: ProductService,
      useFactory: () => ({
        getAllMyProducts: jest.fn(() => []),
        createProduct   : jest.fn(() => []),
        updateProduct   : jest.fn(() => []),
        deleteProduct   : jest.fn(() => []),
      })
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService , ApiServiceProvider],
    }).compile();

    productController = app.get<ProductController>(ProductController);
    productService = app.get<ProductService>(ProductService);
  })

  it("calling getAllMyProducts method", () => {
    const userId : number = 1;
    productController.getAllMyProducts(userId);
    expect(productService.getAllMyProducts).toHaveBeenCalled();
    expect(productService.getAllMyProducts).toHaveBeenCalledWith(userId);
  });

  it("calling createProduct method", () => {
    const userId : number = 1;
    const productDto = new ProductDto();
    expect(productController.createProduct(userId,productDto)).not.toEqual(null);
  });

  it("calling createProduct method", () => {
    const userId : number = 1;
    const productDto = new ProductDto();
    productController.createProduct(userId,productDto);
    expect(productService.createProduct).toHaveBeenCalled();
    expect(productService.createProduct).toHaveBeenCalledWith(userId , productDto);
  });

  it("calling updateProduct method", () => {
    const productId : number = 1;
    const productDto = new ProductDto();
    productController.updateProduct(productId , productDto);
    expect(productService.updateProduct).toHaveBeenCalled();
    expect(productService.updateProduct).toHaveBeenCalledWith(productId , productDto);
  });

  it("calling deleteProduct method", () => {
    const userId : number = 1;
    const productId : number = 1;
    productController.deleteProduct(userId , productId);
    expect(productService.deleteProduct).toHaveBeenCalled();
    expect(productService.deleteProduct).toHaveBeenCalledWith(userId , productId);
  })
});