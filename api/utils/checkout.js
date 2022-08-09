checkout = (cloneOrder, order) => {
  return cloneOrder.map((item, i) => {
    let productDetail = item.productDetail.slice(); // clone product detail

    productDetail.forEach(({ color }, index) => {
      if (color.color === item.selectedColor) {
        // check if same color
        productDetail[index] = {
          ...productDetail[index],
          sizeAndQuantity: productDetail[index].sizeAndQuantity.map(
            ({ size, quantity }) => {
              if (size.size === item.selectedSize) {
                // check if same color and size
                return { size, quantity: quantity + item.selectedQuantity }; // update quantity
              } else {
                // orther color
                const quantityProductInCart = order // check item in cart find quantity of exist product
                  .slice(0, i)
                  .find(
                    ({ _id, selectedColor, selectedSize }) =>
                      _id === item._id &&
                      selectedColor === color.color &&
                      selectedSize === size.size
                  );
                const newQuantity =
                  quantityProductInCart?.selectedQuantity || 0; // if product does not exist => 0
                return { size, quantity: quantity + newQuantity };
              }
            }
          ),
        };
      } else {
        // check other case
        productDetail[index] = {
          ...productDetail[index],
          sizeAndQuantity: productDetail[index].sizeAndQuantity.map(
            ({ size, quantity }) => {
              const quantityProductInCart = order
                .slice(0, i)
                .find(
                  ({ _id, selectedColor, selectedSize }) =>
                    _id === item._id &&
                    selectedColor === color.color &&
                    selectedSize === size.size
                );

              const newQuantity = quantityProductInCart?.selectedQuantity || 0;
              return { size, quantity: quantity + newQuantity };
            }
          ),
        };
      }
    });

    let selectedQuantity = item.selectedQuantity;
    cloneOrder.slice(0, i).forEach((product) => {
      if (product._id === item._id) {
        selectedQuantity += product.selectedQuantity;
      }
    });

    return {
      ...item,
      productDetail,
      quantityStock: item.quantityStock + selectedQuantity,
    };
  });
};

module.exports = checkout;
