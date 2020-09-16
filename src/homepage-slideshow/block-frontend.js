const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.arrow-left');
const slideSelectBtns = document.getElementsByClassName('circles');
const nextBtn = document.querySelector('.arrow-right');

this.setInterval(() => {
    const listItems = document.querySelectorAll('.circles');
    const activeClass = jQuery('.slide-dots-list li.active');

    for(let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('active');
       
        if (activeClass.is(':last-child')) {
            jQuery('.slide-dots-list li').first().addClass('active');
            jQuery('.slide-dots-list li').last().removeClass('active');
            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

           
            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');

        } else {
            jQuery(activeClass).next('.slide-dots-list li').addClass('active');
            jQuery('.slide-dots-list li.active').prev('.slide-dots-list li').removeClass('active');

            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');
    
        }
    }
}, 10000);

for(let i = 0; i < slideSelectBtns.length; i++) {
    slideSelectBtns[i].addEventListener('click', (e) => {
    const listItems = document.querySelectorAll('.circles');
    for(let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('active');
    }

    e.target.parentNode.parentNode.classList.add('active');
    const slideShowImgObj = JSON.parse(localStorage.getItem("media"));
    const id = jQuery('.slide-dots-list li.active').data("id");
    const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
    const url = newObj[0].url;

    const newBg = jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
        .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');
            
    localStorage.setItem('currSlideId', JSON.stringify(id));
    });
}


const nextSlide = e => {
    console.log('nextSlide');
    const listItems = document.querySelectorAll('.circles');
    const activeClass = jQuery('.slide-dots-list li.active');

    for(let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('active');
       
        if (activeClass.is(':last-child')) {
            jQuery('.slide-dots-list li').first().addClass('active');
            jQuery('.slide-dots-list li').last().removeClass('active');
            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

           
            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position:relative; transition: .22s ease-in-out');

        } else {
            jQuery(activeClass).next('.slide-dots-list li').addClass('active');
            jQuery('.slide-dots-list li.active').prev('.slide-dots-list li').removeClass('active');

            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');
    
        }
    }
  
}

const prevSlide = e => {
    console.log('prevSlide');

    const listItems = document.querySelectorAll('.circles');
    const activeClass = jQuery('.slide-dots-list li.active');

    for(let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('active');
       
        if (activeClass.is(':first-child')) {
            jQuery('.slide-dots-list li').last().addClass('active');
            jQuery('.slide-dots-list li').first().removeClass('active');
            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

           
            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');

        } else {
             jQuery(activeClass).prev('.slide-dots-list li').addClass('active');
			  jQuery(activeClass).next('.slide-dots-list li').removeClass('active');

            const slideShowImgObj = JSON.parse(localStorage.getItem("media"));

            const id = jQuery('.slide-dots-list li.active').data("id");
            const newObj = slideShowImgObj.filter((item, index, arr) => index === id);
            const url = newObj[0].url;

            jQuery('.wp-block-cgb-block-illkidrecords-blocks-slideshow')
            .attr('style', 'background-image: url("'+ url +'"); background-repeat: no-repeat; background-size: cover; background-position: 0 -31px; height: 100vh; display: flex; align-items: center; position: relative; transition: .22s ease-in-out');
        }
    }   
}

nextBtn.addEventListener('click', e => {
    nextSlide();
});

prevBtn.addEventListener('click', e => {
    prevSlide();
});

