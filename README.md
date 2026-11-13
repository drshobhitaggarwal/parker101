# Parker 101 Watches website

Three pages, no build step, no dependencies:

- `index.html` — About us (boilerplate copy, live watch face)
- `showcase.html` — six watches, five pictures each, with enlarge view
- `contact.html` — contact form that emails you

## 1. Make the contact form email you (5 minutes)

The form uses Web3Forms, a free service that forwards each submission to an inbox.

1. Go to https://web3forms.com and enter the email address that should receive messages.
2. They email you an access key.
3. Open `contact.html`, find `PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE` and replace it with your key.
4. Put the site online (step 2 below), fill in the form once, and check the inbox.

Until the key is added, the form shows "This form is not connected to email yet."
The key is safe to leave in the page. It can only send mail to the address you registered.
Spam is limited by a hidden honeypot field; Web3Forms also filters on their side.

## 2. Put it online

Upload the whole folder to any static host. The easiest are Netlify Drop (drag the folder onto app.netlify.com/drop),
Cloudflare Pages or GitHub Pages. Open `index.html` from your computer to preview the design,
but test the form from the live site.

## 3. Replace the sample content

Everything below is sample content and needs the real details:

- Company name "Parker 101 Watches" (header, footer, page titles, dial text in the pictures)
- About us copy in `index.html` (marked with a BOILERPLATE comment)
- Contact email, phone and address in `contact.html` (marked PLACEHOLDERS)
- Product names, specs and prices in `showcase.html`
- Colours and fonts: the variables at the top of `assets/css/site.css`

### Using real product photos

Each picture is a file in `assets/img/` named `<product>-<n>-<view>.svg`. Save your photo as a `.jpg` or `.webp`
and change the `src` and `data-src` in `showcase.html` to match (each picture appears in a thumbnail button and in the
main viewer). To add a watch, copy one whole `<section class="product">` block and edit it, then add a link for it in the
row near the top of the page.

The watch pictures are illustrations drawn for this site, not photographs of any real product.
Fonts (Jost and Newsreader) are bundled in `assets/fonts` under the SIL Open Font License.
