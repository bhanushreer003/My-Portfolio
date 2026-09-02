from flask import *
import pandas as pd
import pickle
import numpy as np
from xgboost import XGBClassifier
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re

app = Flask(__name__)

app.secret_key=('secret_key')

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']='root'
app.config['MYSQL_DB']='validate'
mysql=MySQL(app)

#load model
model = pickle.load(open('model.pkl', 'rb'))

@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

@app.route('/sign')
def sign():
    return render_template('signup.html')

@app.route('/signup', methods=['GET','POST']) 
def signup():
	msg=''
	if request.method=='POST':
		username=request.form['username']
		password=request.form['password']
		email=request.form['email']
		password2=request.form['password2']
		cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM signin WHERE username=%s',(username,))
		account=cursor.fetchone()
		if account:
			msg='Account already exists!'
		elif password !=password2:
			msg='Passwords do not match!'
		else:
			cursor.execute('INSERT INTO signin VALUES(NULL, %s, %s, %s)', (username,password,email,))
			mysql.connection.commit()
			return redirect(url_for('login'))
	return render_template('signup.html',msg=msg)

@app.route('/login2', methods=['POST'])
def login2():
	msg=''
	if request.method=='POST':
		username=request.form['uname']
		password=request.form['pwd']
		cursor=mysql.connection.cursor(MySQLdb.cursors.DictCursor)
		cursor.execute('SELECT * FROM signin WHERE username=%s AND password =%s',(username,password,))
		user=cursor.fetchone()
		if user:
			return redirect(url_for('upload'))
		else:
			msg='Invalid Login! Plz Try Again!'
	return render_template('login.html',msg=msg)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/preview', methods=['POST'])
def preview():
    if request.method == 'POST':
        dataset = request.files['datasetfile']
        df = pd.read_csv(dataset,encoding = 'unicode_escape')
        df.set_index('Id', inplace=True)
        return render_template("preview.html",df_view = df)	

@app.route('/prediction')
def prediction():
    return render_template('prediction.html')

@app.route('/predict',methods=['POST'])
def predict():
    int_feature = [x for x in request.form.values()]
    
    final_features = [np.array(int_feature, dtype=object)]
    
    result=model.predict(final_features)
    
    if result == 1:
        result = "Abnormal"
    else:
        result = 'Normal'
	
    return render_template('prediction.html', prediction_text= result)

@app.route('/performance')
def performance():
    return render_template('performance.html')

@app.route('/chart')
def chart():
    return render_template('chart.html')

if __name__ == '__main__':
    app.run(debug=True)