from datetime import date, timedelta, datetime

d = date(2022, 4, 4)

for i in range(0, 44):
    n = d + timedelta(days=i * 4)
    tokenid = f'40000{i:02}'
    avail = datetime.strftime(n, '%Y-%m-%d')
    print(f"<figure class='thumbnail-grid-item'> <figcaption> <b> #{i} </b>: <a href='https://plottables.io/token/{tokenid}'>Plottables</a> · <a href='https://opensea.io/assets/0xa319c382a702682129fcbf55d514e61a16f97f9c/{tokenid}'>Open Sea</a> · <a href='https://www.plottables.io/api/token/{tokenid}/svg' target='_blank'>SVG</a> · Available {avail} · Not yet claimed</figcaption> </figure>")
    #print(f"<figure class='thumbnail-grid-item'> <figcaption> <b> #{i} </b>: Available {avail} · Not yet claimed</figcaption> </figure>")

