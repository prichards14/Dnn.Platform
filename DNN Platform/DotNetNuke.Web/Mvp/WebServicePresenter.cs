﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
// See the LICENSE file in the project root for more information

namespace DotNetNuke.Web.Mvp
{
    using System;

    using WebFormsMvp;

    [Obsolete("Deprecated in DNN 9.2.0. Replace WebFormsMvp and DotNetNuke.Web.Mvp with MVC or SPA patterns instead. Scheduled removal in v11.0.0.")]
    public abstract class WebServicePresenter<TView> : Presenter<TView>
        where TView : class, IWebServiceView
    {
        /// <summary>Initializes a new instance of the <see cref="WebServicePresenter{TView}"/> class.</summary>
        /// <param name="view">The view.</param>
        protected WebServicePresenter(TView view)
            : base(view)
        {
        }
    }
}
