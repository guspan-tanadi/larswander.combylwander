from datetime import date, timedelta, datetime

d = date(2022, 4, 4)

for i in range(1, 45):
    n = d + timedelta(days=(i - 1) * 4)
    tokenid = f'40000{i:02}'
    avail = datetime.strftime(n, '%Y-%m-%d')
    #print(f"<figure class='thumbnail-grid-item'> <img src='https://plottables-mainnet.s3.amazonaws.com/{tokenid}.png'> <figcaption> <b> #{i} </b>: <a href='https://plottables-mainnet.s3.amazonaws.com/{tokenid}.png' target='_blank'>high res</a> -- <a href='https://plottables.io/token/{tokenid}'>plottables</a> -- Available {avail}</figcaption> </figure>")
    print(f"<figure class='thumbnail-grid-item'> <figcaption> <b> #{i} </b>: Available {avail} · Not yet claimed</figcaption> </figure>")

