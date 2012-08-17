#include <QDeclarativeContext>
#include <QDeclarativeView>
#include <QApplication>
#include <QtCore/QFileInfo>
#include <QtCore/QSettings>
#include <QtGui/QApplication>
#include <QtDeclarative/QDeclarativeEngine>
#include <QtDeclarative/QDeclarativeNetworkAccessManagerFactory>
#include <QtNetwork/QNetworkConfiguration>
#include <QtNetwork/QNetworkConfigurationManager>
#include <QtNetwork/QNetworkAccessManager>
#include <QtGui>
#include <QFile>    //new added

#include <myqdeclarativeview.h>

//#include <Camera.h>
//#include <QCameraViewfinder>



int main(int argc, char *argv[])
{

    QApplication app(argc, argv);
    MyQDeclarativeView myView;

//    CameraExample camera;
//    camera.showFullScreen();

//    view.rootContext()->setContextProperty("camera", &camera);


    /* for getting cellid.*/
    MyNetworkInfo* myNetworkInfo = new MyNetworkInfo();

    /* read xml */
    QFile file(":/xml.xml");
    if(!file.open(QIODevice::ReadOnly | QIODevice::Text)) {
        return 1;
    }
    QTextStream fs(&file);
    QString sss(fs.readAll());

    myView.view.rootContext()->setContextProperty("myNetworkInfo", myNetworkInfo);
    myView.view.rootContext()->setContextProperty("sss", sss);  //the former is var in js, and the last is var in c++

    myView.view.rootContext()->setContextProperty("myView", &myView);

    /* set receivers of show music player signal. */
    myView.view.setSource(QUrl("qrc:MashupUI.qml"));
    QObject *item = (QObject *)myView.view.rootObject();
    QObject::connect(item, SIGNAL(showPlayerSignal()), &myView, SLOT(myHide()));

    myView.view.show();

    /* start to run the mashup.
     * this function has to be behind "myView.view.show()"
     * because "QObject::connect(item, SIGNAL(showPlayerSignal()), &myView, SLOT(myHide()));" won't work before
     * "myView.view.show()".
     * */
    QMetaObject::invokeMethod(item, "run");

    return app.exec();

    /* for test desktop version.*/
//    QApplication app(argc, argv);
//    QDeclarativeView myView;
//    myView.setSource(QUrl("qrc:MashupUI.qml"));
//    myView.show();
//    return app.exec();

}
