import { ProductCard as IProductCard } from '../../domain/model/orders.model';
import css from './product-card.module.css';
import cn from 'classnames';

interface ProductCardProps {
    readonly productCard: IProductCard;
    readonly key: number;
    readonly isBonus: boolean;
}

const ProductCard = ({ productCard, key, isBonus }: ProductCardProps) => {
    const renderCoast = (isBonus: boolean) => {
        if (!isBonus) {
            return (
                <>
                    <p>
                        Цена до скидки: {productCard.gamePriceAfter.toFixed(2)}{' '}
                        ₾/hr
                    </p>
                    <p>
                        Цена после скидки:{' '}
                        {productCard.gamePriceAfter.toFixed(2)} ₾/hr
                    </p>
                </>
            );
        } else {
            return <></>;
        }
    };

    return (
        <div className={css.card} key={key}>
            <img
                className={css.image}
                src={productCard.game.images[0].link}
                alt="Game img"
            />
            <div className={css.info}>
                <div className={css.headline}>
                    <div
                        className={cn(css.bonusLabel, {
                            [css.disabled]: !isBonus,
                        })}
                    >
                        <p>Bonus</p>
                    </div>
                    <h4>{productCard.game.title}</h4>
                </div>
                {renderCoast(isBonus)}
            </div>
        </div>
    );
};

export default ProductCard;
