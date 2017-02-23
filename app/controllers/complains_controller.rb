class ComplainsController < ApplicationController
  before_action :set_complain, only: [:show, :update, :destroy]
  skip_before_filter :verify_authenticity_token  
  # GET /complains
  # GET /complains.json
  def index
    @complains=Complain.all
  end


  def myComplains
    @complains=Complain.where(:public_username=>current_user.username)
    if params[:fetch]=="all"
      @complains=Complain.where(:public_username=>current_user.username)
    elsif params[:fetch]=="resolved"
      @complains=Complain.where(:public_username=>current_user.username, :status=>"Resolved", :close=>FALSE)
    elsif params[:fetch]=="closed"
      @complains=Complain.where(:public_username=>current_user.username, :close=>TRUE)
    elsif params[:fetch]=="close"
      @complain=Complain.where(:id=>params[:id])
      @complain.update(:close=> 'TRUE')
    end
    @complains = @complains.paginate(:page => params[:page], :per_page => 6)
  end

  def report
   @complains=Complain.where(:admin_username=>current_user.username)
     respond_to do |format|
      format.html
      format.csv do
        headers['Content-Disposition'] = "attachment; filename=\"report.csv\""
        headers['Content-Type'] ||= 'text/csv'
      end
    end

  end



def addvote
  @upvote=Upvote.where("username=? AND complainid=?",current_user.username,params[:vote]).first
  if @upvote
   notice="You have already voted this complain!"
 else
   $count=Complain.where(:id=>params[:vote]).first.votecount
   Complain.where(:id=>params[:vote]).update(:votecount=>$count+1)
   @upvote=Upvote.create(:complainid => params[:vote], :username => current_user.username)
   redirect_to params[:location]
 end
end



  # GET /complains/1
  # GET /complains/1.json
  def show

  end

  # GET /complains/new
  def new
    @complain = Complain.new
  end

  # GET /complains/1/edit
  def edit
    if current_user.usertypeid==2
      redirect_to 'https://cms-marauders.herokuapp.com'
    end
  end
  
  # POST /complains
  # POST /complains.json
  def create

    @complain = Complain.new(complain_params)

    respond_to do |format|
      if @complain.save
        format.html { redirect_to @complain, notice: 'Complain was successfully created.' }
        format.json { render :show, status: :created, location: @complain }
      else
        format.html { render :new }
        format.json { render json: @complain.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /complains/1
  # PATCH/PUT /complains/1.json
  def update

    respond_to do |format|
      if @complain.update(complain_update)
        if @complain.status == "Resolved"
         $date=Time.new
         $resolved_date=$date.strftime("%Y-%m-%d")
         @complain.update(:resolved_date=> $resolved_date)
       end
       format.html { redirect_to @complain, notice: 'Complain was successfully updated.' }
       format.json { render :show, status: :ok, location: @complain }
     else
      format.html { render :show }
      format.json { render json: @complain.errors, status: :unprocessable_entity }
    end

  end
end

def complain_update

  params.require(:complain).permit(:status,:comment)
end

  # DELETE /complains/1
  # DELETE /complains/1.json
  def destroy
    @complain.destroy
    respond_to do |format|
      format.html { redirect_to complains_url, notice: 'Complain was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_complain
      @complain = Complain.find(params[:id])

    end
    # Never trust parameters from the scary internet, only allow the white list through.
    def complain_params
     $admin=Zone.where(:id=> (Ward.where(:wardno=>current_user.wardid).first.zoneid)).first.admin_username
     date=Time.new
     $regdate=date.strftime("%Y-%m-%d")
     defaults={admin_username: $admin,public_username: current_user.username,wardid: current_user.wardid,votecount: 0,register_date: $regdate,status: 'Assigned', close: FALSE }

     params.require(:complain).permit(:admin_username, :public_username , :wardid , :title, :description , :locality, :votecount , :register_date , :status , :imageurl, :close ).reverse_merge(defaults)
   end
 end
