import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Package, Cloud, Phone, AlertCircle, CheckCircle, Plane, Factory, Hotel, Clock, Thermometer } from 'lucide-react';

const AlphaProjectDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=30.7&longitude=121.0&current=temperature_2m,relative_humidity_2m,apparent_temperature,weathercode,windspeed_10m&hourly=temperature_2m,weathercode&timezone=Asia/Shanghai&forecast_days=2`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Weather fetch error:', error);
      setLoading(false);
    }
  };

  const getWeatherIcon = (code) => {
    const icons = {
      0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
      45: '🌫️', 48: '🌫️',
      51: '🌦️', 53: '🌧️', 55: '🌧️',
      61: '🌦️', 63: '🌧️', 65: '⛈️',
      71: '🌨️', 73: '❄️', 75: '❄️'
    };
    return icons[code] || '🌤️';
  };

  const getWeatherDesc = (code) => {
    const desc = {
      0: 'Clear', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Foggy', 51: 'Light drizzle', 53: 'Drizzle', 61: 'Light rain', 63: 'Rain'
    };
    return desc[code] || 'Unknown';
  };

  const tabs = [
    { id: 'overview', label: 'Trip Overview', icon: Calendar },
    { id: 'weather', label: 'Live Weather', icon: Cloud },
    { id: 'packing', label: 'Packing List', icon: Package },
    { id: 'schedule', label: 'Daily Schedule', icon: Clock },
    { id: 'contacts', label: 'Contacts', icon: Phone }
  ];

  const schedule = [
    {
      date: 'Nov 9',
      day: 'Saturday',
      activities: [
        { time: '11:00 PM', desc: 'Meet at BKK Airport', icon: '✈️' }
      ]
    },
    {
      date: 'Nov 10',
      day: 'Sunday',
      activities: [
        { time: '1:10 AM', desc: 'Depart TG662 from Bangkok', icon: '✈️' },
        { time: '6:25 AM', desc: 'Arrive Shanghai PVG', icon: '🛬' },
        { time: '9:30 AM', desc: 'Check-in Hotel (Pinghu)', icon: '🏨' },
        { time: '1:00-5:00 PM', desc: 'Transfer of Technology Workshop', icon: '🏭' },
        { time: '6:30-10:00 PM', desc: 'Dinner', icon: '🍽️' }
      ]
    },
    {
      date: 'Nov 11',
      day: 'Monday',
      activities: [
        { time: '8:30 AM', desc: 'Hotel Pickup', icon: '🚗' },
        { time: '9:00 AM-12:30 PM', desc: 'FHPSD Doorway Module Test (FT 7100)', icon: '🔧' },
        { time: '2:00-5:00 PM', desc: 'FT 7100 Testing (continued)', icon: '🔧' },
        { time: '7:00-9:00 PM', desc: 'Dinner', icon: '🍽️' }
      ]
    },
    {
      date: 'Nov 12',
      day: 'Tuesday',
      activities: [
        { time: '9:00 AM-12:30 PM', desc: 'FHPSD Structure/Frame Test (FT7300)', icon: '🔧' },
        { time: '2:00-5:00 PM', desc: 'FT7300 + Technical Discussion', icon: '💼' },
        { time: '7:00-9:00 PM', desc: 'Dinner', icon: '🍽️' }
      ]
    },
    {
      date: 'Nov 13',
      day: 'Wednesday',
      activities: [
        { time: '9:00 AM-12:00 PM', desc: 'HHPSD Doorway Module (FT3000)', icon: '🔧' },
        { time: '2:00-5:00 PM', desc: 'FT3000 Testing (continued)', icon: '🔧' },
        { time: '7:00-9:00 PM', desc: 'Dinner', icon: '🍽️' }
      ]
    },
    {
      date: 'Nov 14',
      day: 'Thursday',
      activities: [
        { time: '9:00 AM-12:00 PM', desc: 'Final Testing & Conclusion', icon: '✅' },
        { time: '4:00 PM', desc: 'Depart for PVG Airport', icon: '🚗' },
        { time: '5:20 PM', desc: 'Flight TG665 to Bangkok', icon: '✈️' },
        { time: '9:15 PM', desc: 'Arrive Bangkok', icon: '🛬' }
      ]
    }
  ];

  const packingList = {
    work: [
      'Passport + China visa',
      'Flight tickets (TG662/665)',
      'Hotel booking confirmation',
      'FAT test documents',
      'Business cards',
      'Laptop + charger',
      'Phone + charger',
      'Power bank (10,000mAh+)',
      'Universal adapter (Type A/C/I)',
      'Notebook + 2 pens',
      'Camera for documentation'
    ],
    clothing: [
      '2 business shirts/polos',
      '1 smart pants (dark)',
      '1 business shoes',
      '1 belt',
      '3 dress socks',
      '2 t-shirts',
      '1 casual pants',
      '1 sneakers',
      '3 underwear',
      '2 casual socks',
      '1 sleepwear',
      '1 light jacket (wear on flight)',
      '1 sweater/fleece',
      '1 packable rain jacket'
    ],
    toiletries: [
      'Toothbrush + toothpaste',
      'Deodorant',
      'Razor',
      'Face wash',
      'Moisturizer',
      'Pain reliever',
      'Stomach medicine',
      'Hand sanitizer',
      '5 face masks'
    ],
    extras: [
      'Sunglasses',
      'Small umbrella',
      'Water bottle',
      '3-4 snack bars',
      'Plastic bag (laundry)',
      'Travel pillow',
      'Earphones',
      'Tissues/wet wipes'
    ]
  };

  const contacts = [
    { name: 'Mr. Aphiwut Roekwiang', role: 'STE (TH)', phone: '092-715-6265' },
    { name: 'Mr. Herh Peng Leng', role: 'STE', phone: '+65 9759-7194' },
    { name: 'Thai Embassy Beijing', role: 'Embassy', phone: '+86-10-8531-8735' },
    { name: 'China Police', role: 'Emergency', phone: '110' },
    { name: 'China Medical', role: 'Emergency', phone: '120' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">#Alpha_Project</h1>
              <p className="text-gray-600">FAT Doorway Module - China Trip Dashboard</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <span className="flex items-center gap-1 text-blue-600">
                  <Calendar className="w-4 h-4" />
                  Nov 9-14, 2025
                </span>
                <span className="flex items-center gap-1 text-green-600">
                  <MapPin className="w-4 h-4" />
                  Pinghu/Haiyan, Zhejiang
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Days Until Trip</div>
              <div className="text-4xl font-bold text-indigo-600">11</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 p-2">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Hotel className="w-6 h-6 text-blue-600" />
                    <h3 className="text-lg font-semibold">Accommodation</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Courtyard by Marriott Pinghu</p>
                    <p className="text-gray-600">No.288, Wenwei Road, Danghu Street</p>
                    <p className="text-gray-600">Pinghu, Zhejiang, China</p>
                    <p className="mt-3 font-medium">Alternative:</p>
                    <p className="text-gray-600">Pullman Jiaxing Pinghu Excellence</p>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Factory className="w-6 h-6 text-green-600" />
                    <h3 className="text-lg font-semibold">FAT Venue</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Zhejiang Rongchen Technology Co., Ltd.</p>
                    <p className="text-gray-600">No. 735 Yintan Road, Economic Dev. Zone</p>
                    <p className="text-gray-600">Xitangqiao Town, Haiyan County</p>
                    <p className="text-gray-600">Jiaxing, Zhejiang 314300</p>
                    <p className="mt-3 text-blue-600">~30 km from hotel (~40 min drive)</p>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Plane className="w-6 h-6 text-purple-600" />
                    <h3 className="text-lg font-semibold">Flight Details</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium">Outbound: TG662</p>
                      <p className="text-gray-600">Nov 9, 1:10 AM (BKK → PVG)</p>
                      <p className="text-gray-600">Arrive: Nov 10, 6:25 AM</p>
                    </div>
                    <div>
                      <p className="font-medium">Return: TG665</p>
                      <p className="text-gray-600">Nov 14, 5:20 PM (PVG → BKK)</p>
                      <p className="text-gray-600">Arrive: 9:15 PM</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer className="w-6 h-6 text-orange-600" />
                    <h3 className="text-lg font-semibold">Expected Weather</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Mild Autumn Conditions</p>
                    <p className="text-gray-600">🌡️ Day: 15-18°C (59-64°F)</p>
                    <p className="text-gray-600">🌙 Night: 8-12°C (46-54°F)</p>
                    <p className="text-gray-600">☀️ Mostly sunny/partly cloudy</p>
                    <p className="text-gray-600">🌧️ Rain: 10-20% (low chance)</p>
                    <p className="mt-3 text-green-600 font-medium">Perfect for factory testing!</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-yellow-800 mb-1">Important Reminders</p>
                    <ul className="space-y-1 text-yellow-700">
                      <li>• Download VPN app before arrival (Google/WhatsApp blocked in China)</li>
                      <li>• Get Chinese Yuan (CNY) cash before trip</li>
                      <li>• Download MoWeather app for accurate local weather</li>
                      <li>• Daily pickup at 8:30 AM from hotel lobby</li>
                      <li>• All meals provided by organizer</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weather Tab */}
          {activeTab === 'weather' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Live Weather - Pinghu, China</h2>
                <button
                  onClick={fetchWeather}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  🔄 Refresh
                </button>
              </div>

              {loading ? (
                <div className="text-center py-12 text-gray-500">Loading weather data...</div>
              ) : weather ? (
                <>
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-7xl font-bold mb-2">
                          {Math.round(weather.current.temperature_2m)}°C
                        </div>
                        <div className="text-xl mb-1">{getWeatherDesc(weather.current.weathercode)}</div>
                        <div className="text-sm opacity-90">
                          Feels like {Math.round(weather.current.apparent_temperature)}°C
                        </div>
                      </div>
                      <div className="text-8xl">{getWeatherIcon(weather.current.weathercode)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-gray-500 text-xs uppercase mb-2">Humidity</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {weather.current.relative_humidity_2m}%
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-gray-500 text-xs uppercase mb-2">Wind Speed</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(weather.current.windspeed_10m)} km/h
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 text-center">
                      <div className="text-gray-500 text-xs uppercase mb-2">Wind Dir.</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {weather.current.wind_direction_10m}°
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
                    <div className="grid grid-cols-8 gap-2 overflow-x-auto">
                      {weather.hourly.time.slice(0, 24).map((time, i) => {
                        const hour = new Date(time).getHours();
                        return (
                          <div key={i} className="bg-gray-50 rounded-lg p-3 text-center min-w-[70px]">
                            <div className="text-xs text-gray-500 mb-1">{hour}:00</div>
                            <div className="text-2xl mb-1">{getWeatherIcon(weather.hourly.weathercode[i])}</div>
                            <div className="text-sm font-semibold">{Math.round(weather.hourly.temperature_2m[i])}°C</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {lastUpdate && (
                    <div className="text-center text-xs text-gray-500">
                      Last updated: {lastUpdate.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' })}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 text-red-500">Failed to load weather data</div>
              )}
            </div>
          )}

          {/* Packing List Tab */}
          {activeTab === 'packing' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">45L Backpack Packing List</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">💼</span> Work Essentials
                  </h3>
                  <div className="space-y-2">
                    {packingList.work.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">👕</span> Clothing (10-18°C)
                  </h3>
                  <div className="space-y-2">
                    {packingList.clothing.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">🧴</span> Toiletries
                  </h3>
                  <div className="space-y-2">
                    {packingList.toiletries.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎒</span> Extras
                  </h3>
                  <div className="space-y-2">
                    {packingList.extras.map((item, i) => (
                      <label key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <p className="font-semibold text-blue-800 mb-2">💡 Packing Tips</p>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Wear bulkiest items (jacket, business shoes) during flight to save space</li>
                  <li>• Use packing cubes to compress clothes by 30%</li>
                  <li>• Roll t-shirts and casual wear, fold business shirts</li>
                  <li>• Stuff socks inside shoes to save space</li>
                  <li>• Estimated weight: 7-8 kg | Space used: ~30L (15L room left!)</li>
                </ul>
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily Schedule</h2>
              
              <div className="space-y-4">
                {schedule.map((day, i) => (
                  <div key={i} className="border rounded-xl overflow-hidden">
                    <div className="bg-indigo-600 text-white p-4">
                      <div className="font-bold text-lg">{day.date}</div>
                      <div className="text-sm opacity-90">{day.day}</div>
                    </div>
                    <div className="p-4 space-y-3">
                      {day.activities.map((activity, j) => (
                        <div key={j} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <span className="text-2xl">{activity.icon}</span>
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-indigo-600">{activity.time}</div>
                            <div className="text-sm text-gray-700">{activity.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contacts Tab */}
          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Emergency Contacts</h2>
              
              <div className="space-y-3">
                {contacts.map((contact, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="font-semibold text-gray-900">{contact.name}</div>
                      <div className="text-sm text-gray-500">{contact.role}</div>
                    </div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      📞 {contact.phone}
                    </a>
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded mt-6">
                <p className="font-semibold text-green-800 mb-2">🇨🇳 China Apps to Download</p>
                <ul className="space-y-1 text-sm text-green-700">
                  <li>• <strong>MoWeather (墨迹天气)</strong> - #1 weather app in China</li>
                  <li>• <strong>VPN app</strong> - Download BEFORE arrival (Google/WhatsApp blocked)</li>
                  <li>• <strong>Google Translate</strong> - Offline Chinese pack</li>
                  <li>• <strong>WeChat</strong> - For local communication & payment</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>#Alpha_Project Dashboard | Last Updated: Oct 29, 2025</p>
          <p className="mt-1">Check weather apps again around Nov 5-7 for most accurate forecasts</p>
        </div>
      </div>
    </div>
  );
};

export default AlphaProjectDashboard;