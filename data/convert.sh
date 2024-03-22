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

sqlite-utils insert tabelog.db tabelogs ./rawdata/udon_kagawa.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/udon_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/udon_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/ramen_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/ramen_osaka.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/ramen_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/ramen_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yakiniku_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yakiniku_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yakiniku_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/curry_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/curry_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/curry_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/asia_ethnic_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/asia_ethnic_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/asia_ethnic_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/wagashi_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/wagashi_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/wagashi_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/sweets_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/sweets_east.csv --csv --ignore
# sqlite-utils insert tabelog.db ./rawdata/tabelogs sweets_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/ice_gelato.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yakitori_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yakitori_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/yoshoku.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/french_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/french_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/french_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/okonomiyaki.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/tempura.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/pizza.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/italian_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/italian_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/italian_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/chinese_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/chinese_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/chinese_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/japanese_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/japanese_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/japanese_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/izakaya.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/bar.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/bread_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/bread_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/bread_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/kissaten.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/cafe.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/unagi.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/sushi_tokyo.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/sushi_east.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/sushi_west.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/tonkatsu.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/soba.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/hamburger.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/steak.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/gyoza.csv --csv --ignore
sqlite-utils insert tabelog.db tabelogs ./rawdata/teishoku.csv --csv --ignore