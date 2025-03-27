const Carousel = () => {
    return (
        <section class="row">
        <div class="col-md-12 my-4">
            
            <div class="carousel slide" id="mycarousel" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="images/navbar3.jpg" height="450px"  class="d-block w-100"/>
                        <div className="carousel-caption d-none d-md-block">
                        <h2 id="one">𝓦𝓮𝓵𝓬𝓸𝓶𝓮!!</h2>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="images/navbar2.jpg"  alt="" height="450px"  class="d-block w-100" />
                        <div className="carousel-caption d-none d-md-block">
                        <h2 id="one">𝓣𝓸</h2>
                        </div>
                    
                    </div>
                    <div class="carousel-item">
                        <img src="images/navbar1.jpg" alt="" className="d-block" height="450px"  class="d-block w-100" />
                        <div className="carousel-caption d-none d-md-block">
                        <h2 id="one">𝓛𝓾𝓷𝓬𝓱𝓑𝓸𝔁</h2>
                        </div>
                    
                    </div>
                </div>
                <a href="#mycarousel" class="carousel-control-prev" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a href="#mycarousel" class="carousel-control-next" data-bs-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </a>

                <ol class="carousel-indicators">
                    <li data-bs-slide="" data-bs-slide-to="0" class="active"></li>
                    <li data-bs-slide="" data-bs-slide-to="1"></li>
                    <li data-bs-slide="" data-bs-slide-to="2"></li>
                </ol>
            </div>
        </div>
      </section>
      
        
     );
}
 
export default Carousel;