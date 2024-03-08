sqlite-utils drop-table tabelog.db tabelogs
sqlite-utils create-table tabelog.db tabelogs \
    store_id integer \
    store_name text \
    store_name_english text \
    score float \
    review_cnt integer \
    url text \
    url_english text \
    address text \
    prefecture text\
    address_english text \
    prefecture_english text\
    website text \
    --pk=store_name

sqlite-utils insert tabelog.db tabelogs udon_kagawa.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs udon_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs udon_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ramen_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ramen_osaka.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ramen_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ramen_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yakiniku_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yakiniku_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yakiniku_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs curry_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs curry_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs curry_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs asia_ethnic_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs asia_ethnic_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs asia_ethnic_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs wagashi_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs wagashi_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs wagashi_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs sweets_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs sweets_east.csv --csv --ignore
# sqlite-utils insert tabelog.db tabelogs sweets_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ice_gelato.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yakitori_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yakitori_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs yoshoku.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs french_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs french_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs french_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs okonomiyaki.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs tempura.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs pizza.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs italian_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs italian_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs italian_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs chinese_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs chinese_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs chinese_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs japanese_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs japanese_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs japanese_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs izakaya.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs bar.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs bread_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs bread_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs bread_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs kissaten.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs cafe.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs unagi.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs sushi_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs sushi_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs sushi_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs tonkatsu.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs soba.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs hamburger.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs steak.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs gyoza.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs teishoku.csv --csv --ignore