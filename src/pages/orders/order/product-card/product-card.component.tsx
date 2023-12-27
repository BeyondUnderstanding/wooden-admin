
import { ProductCard as IProductCard } from '../../domain/model/orders.model';
import css from './product-card.module.css';

const ProductCard = (productCard:IProductCard, id:number) =>{
    console.log(productCard);
    return(
        <div className={css.card} key={id}>
                        <img
                            className={css.image}
                            src={productCard.game.images[0].link}
                            alt="Game img"
                        />
                        <div className={css.info}>
                            <div className={css.headline}>
                                <div className={css.bonusLabel}>
                                    <p>Bonus</p>
                                </div>
                                <h4>{productCard.game.title}</h4>
                            </div>
                            <p>Цена до скидки: {productCard.gamePriceAfter} ₾/hr</p>
                            <p>Цена после скидки: {productCard.gamePriceAfter} ₾/hr</p>
                        </div>
                    </div>
    )
      
}

export default ProductCard