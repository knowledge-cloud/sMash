#include "myqdeclarativeview.h"

MyQDeclarativeView::MyQDeclarativeView(QObject *parent) :
    QObject(parent)
{
    player = new Player(&window);
    window.setCentralWidget(player);
    connect(player, SIGNAL(hideWindow()), this, SLOT(handleHideWindow()));
}

// hide qml view and show music player.
void MyQDeclarativeView::myHide()
{
    view.hide();
    window.showMaximized();
}

// hide music player and show qml view.
void MyQDeclarativeView::handleHideWindow()
{
    window.hide();
    view.show();
    emit playerHidden();
}

QString MyQDeclarativeView::getArtist()
{
    return player->getArtist();
}

QString MyQDeclarativeView::getSongName()
{
    return player->getSongName();
}
