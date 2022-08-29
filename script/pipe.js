class newsFeed {
    
    constructor(){
        this.newsContainer = document.querySelector(".news_container");
        this.title = document.querySelector(".news_title");
        this.description = document.querySelector(".news_description");
        this.category = document.querySelector(".news_category");

        this.country = document.querySelector(".input_country");
    }


    fetchFeed(){


            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:6600/country_news_report',true);
            let param = "input_country="+this.country.value;

            xhr.onload = ()=>{
                if (xhr.status === 200) {

                    let news = JSON.parse(xhr.responseText);
                    console.log(this.country.value);
                    console.log(news);

                    for (let i = 0; i < news.length; i++) {
                        this.newsContainer.innerHTML += `
                            <div class="news_content">

                                <div class="news_title">
                                    ${news[i].title}
                                </div>
                                <div class="news_category">
                                    Category: ${news[i].category}
                                </div>
                                <div class="news_description">
                                    ${news[i].description}
                                </div>
                
                                <div class="link_holder">
                                    <a href="https://tradingeconomics.com${news[i].url}" class="full_content_link">Read more</a>
                                </div>

                            </div>
                            
                        
                        `;  
                        
                    }
                
                } else if(this.status === 404) {
                    alert("page not found ");
                }
                
            }

            xhr.send();
        
    }

    
    
}


let newsContent = new newsFeed();
    newsContent.fetchFeed();

document.querySelector(".input_country").addEventListener("change",()=>{
    newsContent.fetchFeed();
});









    
