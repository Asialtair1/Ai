const universLoad = async (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    displayUnivers(data.data.tools,dataLimit);
} 
    const displayUnivers = (tools,dataLimit) => {
        const universeContainer = document.getElementById('div-container');
        universeContainer.innerHTML='';
//-----------------------seeMore button-------------------------------------// 
            const showAll = document.getElementById('show-all');
            if( dataLimit && tools.length > 6){
              tools = tools.slice(0,6);
              showAll.classList.remove('d-none')
            }
            else{
              showAll.classList.add('d-none')
            }

        tools.forEach(tool => {
            const universeDiv = document.createElement('div')
            universeDiv.classList.add('col')
            universeDiv.innerHTML = `
                <div class="card p-4">
                    <img src="${tool.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                    <h5 class="card-title fw-bold">Features</h5>
                    <ol>
                        <li>${tool.features[0]}</li>
                        <li>${tool.features[1]}</li>
                        <li>${tool.features[2]}</li>
                    </ol>
                  </div>
                  <hr>
                     <div class="d-flex gap-5 mx-auto align-items-center"> 
                        <div>
                            <h5 class="card-title">${tool.name}</h5>
                              <div class="d-flex gap-3">
                                     <div><i class="fa-solid fa-calendar-days"></i></div>
                                    <div><p>${tool.published_in}</p></div>
                              </div>
                         </div>
                         <div>
                         <button onClick="loadAiDetail('${tool.id}')" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#AiUniverseDetails">
                         <i class="fa-sharp fa-solid fa-arrow-right"></i>
                         </button>
                         </div>
                     </div>
                </div>
                ` ;
            universeContainer.appendChild(universeDiv) 
            toggleSpiner(false)      
        })
};
//---------------------Api id link added----------------//
const loadAiDetail = id=>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(details=>dispayUninerseDeatiels(details.data))
    
};
//----------------spiner added--------------//
const toggleSpiner = isLoading =>{
    const loderSection = document.getElementById('loder');
    if(isLoading){
        loderSection.classList.remove("d-none");
    }
    else{
        loderSection.classList.add('d-none')
    }
}
const dispayUninerseDeatiels = Ai => {
    const AiDetailes = document.getElementById('AiTDetailsBody')
    AiDetailes.innerHTML=`
        <div class=" d-flex gap-2">
            <div class="bg-secondary-subtle p-2">
                <h4 class="fw-bold">${Ai.description}</h4>
                 <div class="d-flex gap-3 mt-4 mb-4">
                    <div class="border bg-light p-2">
                            <p class="text-success fw-bolder">${Ai.pricing ? Ai.pricing [0].price:"free of cost"}</p>
                            <p class="text-success fw-bolder">${Ai.pricing ? Ai.pricing [0].plan:"Basic"}</p>
                        </div>
                        <div class="border bg-light p-2">
                            <p class="text-warning fw-bolder">${Ai.pricing ? Ai.pricing [1].price:"free of cost"}</p>
                            <p class="text-warning fw-bolder">${Ai.pricing ? Ai.pricing [1].plan:"pro"}</p>
                        </div>
                        <div class="border bg-light p-2">
                        <p class="text-danger fw-bolder">${Ai.pricing ? Ai.pricing [2].price:"free of cost"}</p>
                        <p class="text-danger fw-bolder">${Ai.pricing ? Ai.pricing [2].plan:"Enterprice"}</p>
                        </div>
                </div>
                <div class="d-flex gap-5">
                    <div>
                    <h4 class="mb-4 fw-bold">Features</h4>
                        <ul>
                            <li>${Ai.features[1].feature_name}</li>
                            <li>${Ai.features[2].feature_name}</li>
                            <li>${Ai.features[3].feature_name}</li>
                         
                        </ul>
                    </div>
                    <div>
                    <h4 class="mb-4 fw-bold">Integrations</h4>
                    <ul>
                        <li>${Ai.integrations ? Ai.integrations[0]:"No data found" }</li>
                        <li>${Ai.integrations ? Ai.integrations[1]:"No data found" }</li>
                        <li>${Ai.integrations ? Ai.integrations[2]:"No data found" }</li>

                    </ul>
                </div>
                    <div>

                    </div>
                </div>
            </div>
             <div>
                <img class="img-fluid" src="${Ai.image_link[0]}">
                <h3 class="mt-4">${Ai.input_output_examples ? Ai.input_output_examples[0].input : "Can you give any example"}</h3>
                <p>${Ai.input_output_examples ? Ai.input_output_examples [1].output :"No! No yet! take a breake!!!"}</p>
             </div>
        </div>
    `
};
// ----------------- Adding-Button-EventListener-------------------//
document.getElementById('btn-showAll').addEventListener('click',function(){
    toggleSpiner(true);
    universLoad();
})
//----------------mainfunction called-------------------//
universLoad(6);
