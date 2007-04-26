/*
 * ***** BEGIN LICENSE BLOCK *****
 * Version: ZPL 1.2
 *
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.2 ("License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.zimbra.com/license
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 *
 * The Original Code is: Zimbra Collaboration Suite Web Client
 *
 * The Initial Developer of the Original Code is Zimbra, Inc.
 * Portions created by Zimbra are Copyright (C) 2007 Zimbra, Inc.
 * All Rights Reserved.
 *
 * Contributor(s):
 *
 * ***** END LICENSE BLOCK *****
 */

function ZmPortalView(parent, appCtxt, controller, dropTgt) {
	var headerList = this._getHeaderList(appCtxt);
	ZmListView.call(this,
        parent, "ZmPortalView", Dwt.ABSOLUTE_STYLE,
        ZmController.PORTAL_VIEW, null, controller, headerList, dropTgt
    );
    this.setLocation(Dwt.LOC_NOWHERE, Dwt.LOC_NOWHERE);

    this._appCtxt = appCtxt;
	this._controller = controller;

    this._initializeView();
}
ZmPortalView.prototype = new ZmListView;
ZmPortalView.prototype.constructor = ZmPortalView;

ZmPortalView.prototype.toString = function() {
	return "ZmPortalView";
};

//
// Public methods
//

ZmPortalView.prototype.getPortletIds = function() {
    return this._portletIds || [];
};

//
// Protected methods
//

ZmPortalView.prototype._getHeaderList = function() {
    return [];
};

ZmPortalView.prototype._initializeView = function() {

    // layout view
    var manifest = this._appCtxt.getApp(ZmApp.PORTAL).getManifest();
    var portalDef = manifest && manifest.portal;
    if (portalDef) {
        this.getHtmlElement().innerHTML = portalDef.html || "";
    }

    // populate portlets
    var portletMgr = this._appCtxt.getApp(ZmApp.PORTAL).getPortletMgr();
    this._portletIds = portletMgr.createPortlets();
};
