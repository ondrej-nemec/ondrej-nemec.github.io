# Potřeba

* SQL Injection - escapování
* XSS - v hlavičce: x-xss protection, převod <>"'& při výpisu
		
# hlavičky:
* "X-Frame-Options: ----" = "CSP:frame-ancestors 'none'"	
   - nacteni stranky ve framu
   - SAMEORIGIN (jen na stejne domene)
   - DENY (zadne framy) ALLOW (default)
* "Content-Security-Policy(-Report-Only)" - ktere zdroje se mohou načitat - white list, odděluje ;
	- default-src 'self' - jen z teto domeny
	- img-src, script-src ('self' 'unsafe-inline' 'strict-dynamic'), object-src 'none' - nelze vložit flash
	- aby bylo možne bezpečne použit script primo ve strance, je potřeba použít atribut nonce="nahodne_cislo", totez cislo se musi pridat do script-scr 'nonce-nahodne_cislo'
	- idealni hlavicka
		script-src 'strict-dynamic' 'nonce-nahodne_cislo' 'unsafe-inline' http: https:; object-src 'none'; report-uri url -> json
	- form-action 'self' všechny formuláře na stránce se odesílají pouze na mojí doménu
	- framy jsou vypnuty, musí se zapinat solo
* "Strict-Transport-Security: max-age= ; " + (includeSubDomains;) - vždy navazase spojeni pres https
* "X-Content-Type-Options: nosniff" - striktni typ responsu - musi to poslat ten soubor, ktery je nebezpecny
* "Public-Key-Pins" - lze přijmout https pokud certifikat s verejnym klicem X - muze byt trochu problem, radi se pouzit vice klicu nebo report only mod
* "X-XSS-Protection 1; mode=block" - proti xss, default je 1 ale bez mode=block - muze blokovat chteny js pokud ho poslu v url; proto je lepsi zabezpecit proti xcc serveru nebo vypnout ochranu
	+ report=url tam se pošle json {request url, request body}

* "Access-Control-Allow-Origin: *"
* "Content-Type"
* "Location: " - redirect

* "Set-Cookie" - nastavi cookie, muze byt vycekrat vse za strednikem je nepovinne
	Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>; Max-Age=<non-zero-digit>; Domain=<domain-value>; Path=<path-value>; Secure; HttpOnly; SameSite=[Strict, lax, none]
		https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie


# ochrana zdroju z cdn
do tagu <script src="..." integrity="--hash--" crossorigin="anonymous"> - pro script a link
- crossorigin: kdo o soubor zada, pridava hlavicku do poradavku, anonymous - nepridavaji se cookies, certs,...

do cookies httponly (pak nejdou ukrast session cookies - nema k ni pristup js, ale jen protokol http) a secure - ??

## nacitani cizich jarek
URLClassLoader child = new URLClassLoader(
        new URL[] {myJar.toURI().toURL()},
        this.getClass().getClassLoader()
);
Class classToLoad = Class.forName("com.MyClass", true, child);
Method method = classToLoad.getDeclaredMethod("myMethod");
Object instance = classToLoad.newInstance();
Object result = method.invoke(instance);

## js eval
http://www.java2s.com/Tutorials/Java/Scripting_in_Java/0040__Scripting_in_Java_eval.htm

## web services
https://www.quora.com/How-can-a-server-send-an-update-without-a-client-request - not completed

##  utoky

https://blog.netwrix.com/2018/05/15/top-10-most-common-types-of-cyber-attacks/
https: https://love2dev.com/blog/how-https-works/

### Denial-of-service (DoS) and distributed denial-of-service (DDoS) attacks
zahlcení požadavky

### Man-in-the-middle (MitM) attack
zachytávání komunikace mezi serverem a clientem
- session hijacking - cizi pocitač se tvaří jako původní
- IP Spoolfing - posilani paketu s trusted IP
- Replay - znovu poslani stare zpravy

=> ochrana: správné šifrování, časové razítko na zprávě

### Phishing and spear phishing attacks
poslani emailu, ktery se tvari, ze je od duverihodne osoby

### Drive-by attack
vlozeni skriptu do html nebo php kodu, zda se, ze primo na serveru

### Password attack
prolomeni hesla
- brute-force
- dictionary

=> ochrana - system zamceni uctu po nekolika opakovanich

### SQL injection attack

sql v textu inputu

=> ochrana - escapovani vkladanych paramentru do sql dotazu

### Cross-site scripting (XSS) attack

software tretich stran bezici v prohlizeci

=> ochrana - escapovani html znaku
musi byt v hlavicce "X-XSS-Protection 1; mode=block"  - samo o sobě nestači

https://securityheaders.cz/x-xss-protection

Definice hlavičky X-XSS-Protection
Zakázáný filtr
X-XSS-Protection: 0;
Ochrana XSS je aktivována, prohlížeč se bude snažit stránku čistit a opravit
X-XSS-Protection: 1;
Ochrana XSS je aktivována, prohlížeč při útoku stránku nezobrazí
X-XSS-Protection: 1; mode=block
Ochrana XSS je aktivována, prohlížeč reportuje porušení pravidel
X-XSS-Protection: 1; report=<reporting-uri>
Prohlížeč neblokuje stránku, ale pokusí se ji vyčistit a opravit. Současně provede reporting útoku. Reportování lze využít pouze u Chrome a prohlížečích postavených na jádru WebKit. Data potenciálních XSS útoků jsou odesílány v JSON formátu na uvedenou adresu.

Nastavení X-XSS-Protection
.htaccess
# X-XSS-Protection settings
Header set X-XSS-Protection "1; mode=block"
Reportování na doménu
Header set X-XSS-Protection "1; report=https://domenaxyz.cz/report"
Nginx
add_header X-XSS-Protection "1; mode=block";


### Eavesdropping attack
chytani klicovych slov v zprave

=> ochrana - šifrovani

### Birthday attack
utok na hash - hleda text se stejnym hashem

### Malware attack
