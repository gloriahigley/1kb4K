window.onload = function(){
    
    const app = document.getElementById('root');
    const container = document.createElement('div');
    container.setAttribute('class', 'container');
    app.appendChild(container);
    
    var xhr = new XMLHttpRequest();
    
    submitButton.addEventListener("click",function(){
        //document.getElementById('root').innerHTML="";
        var userInput = document.getElementById("user-isbn").value; //pull user input value from input field
        var ISBN = userInput.replace("-", "").trim(); //remove any dashes entered and extra trim
        console.log(ISBN);
        document.getElementById('user-isbn').value=''; //clear value entered on submit

        xhr.addEventListener("readystatechange", function(){
            if(this.readyState == 4 && this.status == 200){
            var data = JSON.parse(xhr.responseText);
            data.items.forEach(book => {

        //Create a div with a card class
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        //TESTING NEW FORM IDEA
        const form_test = document.createElement("form");
        form_test.setAttribute('method',"post");
        form_test.setAttribute('action',"/add-book");

        const h2_form = document.createElement("input"); //input element, text
        h2_form.setAttribute('type',"text");
        h2_form.setAttribute('value', book.volumeInfo.title);
        h2_form.setAttribute('name', 'book_title');
        h2_form.setAttribute('type', 'hidden');
        form_test.appendChild(h2_form);

        const author_form = document.createElement("input"); //input element, text
        author_form.setAttribute('type',"text");
        author_form.setAttribute('value', book.volumeInfo.authors);
        author_form.setAttribute('name', 'author_name');
        author_form.setAttribute('type', 'hidden');
        form_test.appendChild(author_form);

        const thumbNail_form = document.createElement("input"); //input element, text
        thumbNail_form.setAttribute('type',"text");
        thumbNail_form.setAttribute('value', book.volumeInfo.imageLinks.thumbnail);
        thumbNail_form.setAttribute('name', 'book_img_thumbnail');
        thumbNail_form.setAttribute('type', 'hidden');
        form_test.appendChild(thumbNail_form);
        
        const p_form = document.createElement("input"); //input element, text
        p_form.setAttribute('type',"text");
        p_form.setAttribute('value', book.volumeInfo.description);
        p_form.setAttribute('name', 'book_description');
        p_form.setAttribute('type', 'hidden');
        form_test.appendChild(p_form);
        
        //Create an h2 and set the text content to the book's title
        const h2 = document.createElement('h2');
        h2.textContent = book.volumeInfo.title;
                            
        const author = document.createElement('p');
        author.textContent = book.volumeInfo.authors;
                            
        const thumbNail = document.createElement('img');
        thumbNail.src = book.volumeInfo.imageLinks.thumbnail;
                            
        const p = document.createElement('p');
        p.textContent = book.volumeInfo.description;
        
        const addBookButton = document.createElement("input"); // Create a <button> element
        addBookButton.setAttribute('type', 'submit')
        addBookButton.setAttribute('value', 'Mark Book As Read');
        form_test.appendChild(addBookButton);
                            
        //Append the cards to the container element
        container.appendChild(card);
        card.appendChild(thumbNail);
        card.appendChild(h2);
        card.appendChild(author);
        card.appendChild(p); 
        card.appendChild(form_test);
                });
            }
            
        });
        
        xhr.open("GET",'https://www.googleapis.com/books/v1/volumes?q=isbn:' + ISBN, true);
        xhr.send();
    });  
};