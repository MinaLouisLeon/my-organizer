import os
import eel

from imap_tools import MailBox , AND

@eel.expose
def fetch_email_from_server(my_imap_server,my_username,my_password) :
    mb = MailBox(my_imap_server).login(my_username,my_password)
    messages = mb.fetch(criteria='ALL',bulk=True)

    my_list = []

    for msg in messages :
        my_dict = {'from' : msg.from_,'subject':msg.subject,'html':msg.html}
        my_list.append(my_dict)

        eel.fetched_email_from_server(my_list)

#for development
eel.init('src',['.tsx','.ts','.jsx','.js','.html','.css'])
eel.start({'port' : 3000},mode="chromeApp",port=8080)

#for production
# eel.init('build',['.js','.html','.htm','.xhtml'])
# eel.start('index.html',mode='chrome',port=8080)