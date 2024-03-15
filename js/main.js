(function ($) {
    "use strict";

    var clicHecho = false;

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    var clicAutomaticoEnlace = function () {

        if(!clicHecho){
        // Obtén el elemento <a> por su id
        var enlace = document.getElementById("enlace");

        // Obtén las dimensiones y la posición del elemento en relación con la ventana gráfica
        var rect = enlace.getBoundingClientRect();

        // Verifica si el elemento está completamente visible en la ventana gráfica
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            // Haz clic en el enlace
            enlace.click();
            clicHecho = true;
        }
    };

}
    
    // Llama a la función para hacer clic automático en el enlace cuando sea necesario
    /*$(window).scroll(function () {
        clicAutomaticoEnlace();
    });*/

    document.addEventListener("DOMContentLoaded", function() {
        var navbarHeight = document.querySelector('.navbar').offsetHeight;
        var defaultOffsetCorrection = 25; // Ajusta la compensación predeterminada según sea necesario
        var servicesContactOffsetCorrection = 5; // Ajusta la compensación específica para las secciones de Servicios y Contacto
    
        var links = document.querySelectorAll('.nav-item.nav-link');
        var isScrolling = false; // Variable para rastrear si se está desplazando
    
        function actualizarEnlaceActivo() {
            var scrollPos = window.scrollY + navbarHeight + defaultOffsetCorrection;
    
            links.forEach(function(link) {
                var section = document.querySelector(link.getAttribute('href'));
    
                if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        }
    
        function aplicarUnderline(e) {
            if (!isScrolling) {
                var link = e.target;
                link.classList.add('clicked'); // Agregar clase para el subrayado persistente
    
                setTimeout(function() {
                    link.classList.remove('clicked'); // Quitar clase después de 1 segundo
                }, 1000); // 1000 milisegundos = 1 segundo
            }
        }
    
        links.forEach(function(link) {
            link.addEventListener('click', aplicarUnderline);
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evitar el comportamiento de desplazamiento predeterminado
    
                var targetId = this.getAttribute('href'); // Obtener el ID del objetivo
                var targetOffset = document.querySelector(targetId).offsetTop; // Obtener el desplazamiento vertical del objetivo
                
                var targetSection = targetId.substring(1); // Obtener el ID de la sección sin el signo de numeral (#)
                var correctedOffset = targetSection === 'servicios' || targetSection === 'contacto' ? servicesContactOffsetCorrection : defaultOffsetCorrection;
    
                window.scrollTo({
                    top: targetOffset - navbarHeight - correctedOffset, // Ajustar la posición de desplazamiento
                    behavior: 'smooth' // Desplazamiento suave
                });
    
                // Remover la clase 'active' de todos los enlaces
                links.forEach(function(link) {
                    link.classList.remove('active');
                });
    
                // Agregar la clase 'active' al enlace actual
                this.classList.add('active');
            });
        });
    
        window.addEventListener('scroll', function() {
            isScrolling = true;
            setTimeout(function() {
                isScrolling = false;
                actualizarEnlaceActivo();
            }, 500); // Retraso para permitir que la animación de desplazamiento termine
        });
    
        // Llama a actualizarEnlaceActivo al cargar la página para establecer el estado inicial
        actualizarEnlaceActivo();
    });
    
    var dropdownItems = document.querySelectorAll('.dropdown-item');

    // Recorrer todos los enlaces y agregar un evento de clic
    dropdownItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            // Evitar el comportamiento predeterminado del enlace
            event.preventDefault();
            
            // Obtener el valor del atributo data-target
            var target = this.getAttribute('data-target');
            
            // Obtener el elemento de lista correspondiente
            var listItem = document.querySelector('[data-filter=".' + target + '"]');
            
            // Quitar la clase "active" de todos los elementos de lista
            document.querySelectorAll('#portfolio-flters li').forEach(function(li) {
                li.classList.remove('active');
            });
            
            // Agregar la clase "active" al elemento de lista correspondiente
            listItem.classList.add('active');
            
            // Simular un clic en el elemento de lista para activar su funcionalidad
            listItem.click();
            
            // Obtener la posición de la sección de proyectos
            var proyectosSection = document.querySelector('#proyectos');
            var proyectosSectionOffset = proyectosSection.offsetTop;
            
            // Desplazarse a la sección de proyectos
            window.scrollTo({
                top: proyectosSectionOffset,
                behavior: 'smooth'
            });
        });
    });

    
    
    
})(jQuery);

