/*
page.getByRole() to locate by explicit and implicit accessibility attributes.
	-I mostly use this for buttons, links, headings

	<button>Click Me</button>
	page.getByRole('button', {name: 'Click Me'});

	<a href="">About</a>
	page.getByRole('link', { name: 'About'} );

	<h1 id="main_heading">HTML Elements</h1>
	page.getByRole('heading', { name: 'HTML Elements'} );



page.getByText() to locate by text content.
	-buttons, links, headings, p

	<button>Click Me</button>
	page.getByText('Click Me');

	<a href="">About</a>
	page.getByText('About');

	<h1 id="main_heading">HTML Elements</h1>
	page.getByText('HTML Elements');

	<p>Hello</p>
	page.getByText('Hello');



page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
	-mostly with input fields

	<input type="text" name="email" id="email" placeholder="Email or phone number">
	page.getByPlaceholder('Email or phone number');
	page.locator('[placeholder="Email or phone number"]')

page.getByAltText() to locate an element, usually image, by its text alternative.
	img

	<img class="fb_logo _8ilh img" src="" alt="Facebook">
	page.getByAltText('Facebook');
	page.locator('[alt="Facebook"]');




page.getByTitle() to locate an element by its title attribute.
	p, a, button, headings, labels

	<a href="https://www.facebook.com/" title="Spanish">Español</a>
	page.getByTitle('Spanish');
	page.locator('[title="Spanish"]');


page.getByTestId() to locate an element based on its data-testid attribute.

	<input type="text" name="email" id="email" data-testid="royal-email" placeholder="Email or phone number" autofocus="1" >

	page.getByTestId('royal-email');
	page.locator('#email');
	page.locator('[data-testid="royal-email"]');


CSS 				-> locator()
data-testid			-> getByTestId()
role 				-> getByRole()



Go to https://www.techglobal-training.com/frontend/actions
Click on "Click on me" button
Validate "You clicked on a button!" text is visible

*/









