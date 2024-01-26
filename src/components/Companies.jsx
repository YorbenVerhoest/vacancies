import React from "react";
import Slider from "react-slick";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

const CustomArrow = (props) => {
    const { className, direction, onClick } = props;
    return (
        direction === 'left' ?
            <ArrowLeftIcon
                className={className}
                onClick={onClick}
            />
            :
            <ArrowRightIcon
                className={className}
                onClick={onClick}
            />

    );
}

const Companies = (props) => {
    var settings = {
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <CustomArrow direction="right" />,
        prevArrow: <CustomArrow direction="left" />,
        responsive: [
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 950,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    return (
        <div className="card companies">
            <h2>Companies</h2>
            {props.data.length > 0 &&
                <Slider {...settings}>
                    {props.data.map((res, index) => (
                        <div className="slideItem" key={index}>
                            <figure><img src="https://picsum.photos/300/300" alt="placeholder" /></figure>
                            <div>
                                <span>{res.name}</span>
                                <h3>{res.recruitment_company ? 'Recruitment' : 'In-house'}</h3>
                                <h3>{res.location ? res.location : '-'}</h3>
                            </div>
                        </div>
                    ))}
                </Slider>}
        </div>
    );
}

export default Companies;
