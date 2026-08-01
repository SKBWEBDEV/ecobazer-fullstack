import { Star } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const CustomerReviews = ({ reviews }) => {
  return (
    <section className="container-app pb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">What our customers say</h2>

        <p className="text-sm text-ink-900/55">
          Trusted reviews from EcoBazer customers.
        </p>
      </div>

      {reviews.length === 0 ? (
        <div className="card-surface p-10 text-center">
          No reviews available yet.
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          speed={1000}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="card-surface p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full bg-moss-100 flex items-center justify-center font-semibold text-moss-700">
                    {review.user?.firstName?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {review.user?.firstName} {review.user?.lastName}
                    </h3>

                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          size={15}
                          className={
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
                  "{review.comment}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
};

export default CustomerReviews;
